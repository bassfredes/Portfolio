import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Forzar generación estática
export const dynamic = 'force-static';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center pt-20">
        <div className="text-9xl mb-6 animate-bounce-slow select-none filter drop-shadow-xl">
          👾
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Nothing here!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          Looks like this page was abducted.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
        >
          Go Home
        </Link>
      </main>
      <Footer />
    </>
  )
}
