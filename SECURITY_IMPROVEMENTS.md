# Contact Form Security Improvements

This document describes the security enhancements made to the contact form to prevent spam, bot attacks, and various security vulnerabilities.

## Implemented Security Measures

### 1. Strict Input Validation (Zod Schema)
- **Name**: 1-100 characters, no line breaks
- **Email**: Valid email format, max 254 characters, no line breaks
- **Message**: 1-2000 characters
- All fields are required and validated on the server side

**Protection**: Prevents malformed data, injection attempts, and oversized payloads

### 2. Enhanced reCAPTCHA v3 Verification
- **Score threshold**: Increased from 0.5 to 0.7 (more strict)
- **Action verification**: Ensures token was generated with action="contact"
- **Hostname verification**: Optional check to prevent token reuse from other domains (commented out for flexibility)

**Protection**: Blocks bots and automated submission attempts

### 3. IP-Based Rate Limiting
- **Limit**: 5 requests per 10 minutes per IP
- **Implementation**: In-memory map (for production, consider Redis/Upstash)
- **Cleanup**: Automatic cleanup of expired entries during rate limit checks
- **Privacy**: IPs are hashed before logging

**Protection**: Prevents spam flooding and abuse

### 4. Honeypot Field
- Hidden "website" field in the form
- Legitimate users won't fill it (it's hidden with CSS)
- Bots that auto-fill all fields will trigger this trap

**Protection**: Catches simple bots that don't parse CSS/visibility

### 5. Timing Check
- Tracks when form was rendered
- Rejects submissions completed in less than 2 seconds
- Humans typically take longer to fill forms

**Protection**: Blocks automated rapid submissions

### 6. Input Sanitization
- **HTML content**: Escaped to prevent XSS in email body
- **Plain text**: Line breaks removed to prevent email header injection
- **Email replyTo**: Sanitized to prevent header injection attacks

**Protection**: Prevents XSS and email header injection vulnerabilities

### 7. API Body Size Limit
- Maximum payload size: 256kb
- Configured at the API route level

**Protection**: Prevents denial-of-service via large payloads

### 8. Improved Error Handling
- Generic error messages to users (no sensitive details)
- Detailed logging server-side with hashed IPs
- No exposure of internal errors or stack traces

**Protection**: Prevents information disclosure

## Testing the Security Features

### Valid Submission Test
```bash
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "This is a test message",
    "recaptchaToken": "valid_token_here",
    "formRenderTime": 1234567890000
  }'
```
**Expected**: 200 OK, email sent successfully

### Invalid Email Test
```bash
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "invalid-email",
    "message": "Test",
    "recaptchaToken": "token"
  }'
```
**Expected**: 400 Bad Request, "Invalid input. Please check your data."

### Rate Limit Test
Make 6 rapid requests from the same IP:
```bash
for i in {1..6}; do
  curl -X POST https://your-domain.com/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com","message":"Test","recaptchaToken":"token"}'
  echo "Request $i"
done
```
**Expected**: First 5 may pass validation checks, 6th should return 429 Too Many Requests

### Honeypot Test
```bash
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Test",
    "website": "http://spam.com",
    "recaptchaToken": "token"
  }'
```
**Expected**: 400 Bad Request, "Invalid request"

### Timing Test
```bash
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"John Doe\",
    \"email\": \"john@example.com\",
    \"message\": \"Test\",
    \"recaptchaToken\": \"token\",
    \"formRenderTime\": $(date +%s)000
  }"
```
**Expected**: 400 Bad Request, "Please take your time filling the form"

### Large Payload Test
```bash
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$(head -c 300000 < /dev/urandom | base64)\"}"
```
**Expected**: 413 Payload Too Large or connection error

## Production Recommendations

### For High-Traffic Sites
1. **Replace in-memory rate limiter** with Redis or Upstash Rate Limit
2. **Enable hostname verification** in reCAPTCHA check
3. **Add monitoring/alerting** for high rate limit rejections
4. **Consider** implementing a CAPTCHA challenge for low-score users instead of outright rejection

### Environment Variables Required
```env
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
GMAIL_USER=your_email@gmail.com
GMAIL_CLIENT_ID=your_oauth_client_id
GMAIL_CLIENT_SECRET=your_oauth_client_secret
GMAIL_REFRESH_TOKEN=your_refresh_token
```

### Optional: Redis-based Rate Limiting
```typescript
// Example with Upstash Redis
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 m"),
});

// In handler:
const { success } = await ratelimit.limit(ip);
if (!success) {
  return res.status(429).json({ error: "Too many requests" });
}
```

## Security Checklist

- [x] Input validation with length limits
- [x] Email format validation
- [x] reCAPTCHA v3 with high threshold (0.7)
- [x] reCAPTCHA action verification
- [x] Rate limiting per IP
- [x] Honeypot field
- [x] Timing check
- [x] HTML sanitization
- [x] Header injection prevention
- [x] Body size limit
- [x] IP hashing in logs
- [x] Generic error messages
- [x] CodeQL security scan passed

## Known Limitations

1. **In-memory rate limiter**: Resets on server restart and doesn't work across multiple instances
   - **Solution**: Use Redis in production
2. **IP-based limiting**: Can affect users behind NAT/proxy
   - **Mitigation**: Adjust limits or implement user-based limiting
3. **No CAPTCHA challenge fallback**: Low-score users are blocked
   - **Alternative**: Show visible CAPTCHA for borderline scores

## Maintenance

- Review logs regularly for patterns of abuse
- Adjust rate limits based on legitimate traffic patterns
- Update reCAPTCHA threshold if too many false positives/negatives
- Monitor email delivery success rates
