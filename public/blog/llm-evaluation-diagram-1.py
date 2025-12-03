import os
from diagrams import Diagram, Cluster, Edge
from diagrams.onprem.client import Users, User
from diagrams.onprem.compute import Server
from diagrams.onprem.network import Internet
from diagrams.onprem.security import Vault
from diagrams.onprem.database import PostgreSQL
from diagrams.onprem.analytics import Tableau
from diagrams.onprem.mlops import Mlflow
from diagrams.onprem.monitoring import Prometheus, Grafana
from diagrams.programming.language import Python
from diagrams.programming.framework import Fastapi
from diagrams.saas.chat import Slack

# =======================================
#  OUTPUT = same folder as this script
# =======================================

script_path = os.path.abspath(__file__)
script_dir = os.path.dirname(script_path)
script_name = os.path.splitext(os.path.basename(script_path))[0]
output_path = os.path.join(script_dir, script_name)

# =======================================
#  Diagram configuration
# =======================================

graph_attr = {
    "splines": "curved",      # Curved lines navigate better around variable-sized nodes
    "rankdir": "LR",
    "nodesep": "2.5",         # Very large vertical separation
    "ranksep": "4.0",         # Very large horizontal separation
    "fontsize": "24",         # Larger title
    "labelloc": "t",
    "pad": "1.0",
    "fontname": "Sans-Serif",
    "bgcolor": "white",
    "concentrate": "false", 
}

node_attr = {
    "fontsize": "15",
    "fontname": "Sans-Serif",
    # REMOVED fixedsize and width/height to allow auto-sizing
    # This prevents text from overlapping the icon or being squashed
    "labelloc": "b",          # Label at bottom
    "height": "2.5",          # Minimum height to ensure space
}

edge_attr = {
    "fontsize": "12",
    "fontname": "Sans-Serif",
    "penwidth": "2.0",        # Thicker lines for better visibility
    "color": "#555555",
    "minlen": "3",            # Force longer edges
}

cluster_attr = {
    "margin": "60",           # Huge margin for clusters
    "fontsize": "18",
    "fontname": "Sans-Serif",
    "pencolor": "#888888",
    "penwidth": "2.0",
}

with Diagram(
    "LLM Evaluation Lifecycle",
    show=False,
    filename=output_path,
    outformat="jpg",
    direction="LR",
    graph_attr=graph_attr,
    node_attr=node_attr,
    edge_attr=edge_attr,
):

    # ----------------------------------------
    # 0. Problem & framing
    # ----------------------------------------
    with Cluster("0. Problem & framing", graph_attr=cluster_attr):
        stakeholders = Users("Business\nstakeholders")
        business_kpis = Tableau("Business metrics\nand objectives")
        constraints = Vault("Regulation,\nsecurity & data\nconstraints")

        stakeholders >> Edge(label="define goals") >> business_kpis
        business_kpis >> Edge(label="context") >> constraints

    with Cluster("Alternative (non-LLM)", graph_attr=cluster_attr):
        alt_solution = Python("Conventional solution\nAutomation / Search / BI")

    # ----------------------------------------
    # 1. Prototype and scoping
    # ----------------------------------------
    with Cluster("1. Prototype and scoping", graph_attr=cluster_attr):
        sample_data = PostgreSQL("Sample data /\nexample tickets")
        llm_prototype = Python("LLM prototype\nnotebook / POC")
        manual_sanity = User("Manual sanity\nchecks")

        sample_data >> Edge(label="prompt tests") >> llm_prototype
        llm_prototype >> Edge(label="early quality check") >> manual_sanity

    # ----------------------------------------
    # 2. Evaluation design
    # ----------------------------------------
    with Cluster("2. Evaluation design", graph_attr=cluster_attr):
        risks = Vault("Risk scenarios\nhallucinations,\nabuse, compliance")
        eval_sets = PostgreSQL("Evaluation datasets\npublic + private")
        metrics_cfg = Tableau("Metrics & thresholds\nquality + safety")

        risks >> Edge(label="coverage") >> eval_sets
        eval_sets >> Edge(label="calibration") >> metrics_cfg

    # ----------------------------------------
    # 3. Offline model evaluation
    # ----------------------------------------
    with Cluster("3. Offline model evaluation", graph_attr=cluster_attr):
        offline_store = PostgreSQL("Eval dataset\nstore")
        offline_runs = Mlflow("Offline eval\nruns")
        offline_scores = Tableau("Offline scores\nreports")

        offline_store >> offline_runs >> offline_scores

    # ----------------------------------------
    # 4. System & pilot evaluation
    # ----------------------------------------
    with Cluster("4. System & pilot evaluation", graph_attr=cluster_attr):
        pilot_ingress = Internet("Pilot traffic\nlimited")
        llm_app = Fastapi("LLM Application\nRAG / tools / API")
        pilot_users = Users("Pilot users")
        red_team = Users("Red team\ntesters")

        pilot_ingress >> llm_app
        pilot_users >> Edge(label="real workflows") >> llm_app
        red_team >> Edge(label="abuse tests") >> llm_app

    # ----------------------------------------
    # 5. Continuous monitoring
    # ----------------------------------------
    with Cluster("5. Continuous monitoring", graph_attr=cluster_attr):
        metrics = Prometheus("Online quality &\nsafety signals")
        dashboards = Grafana("Dashboards &\nalerts")
        incidents = Slack("Incident review\nnew test cases")

        metrics >> dashboards >> incidents

    # ----------------------------------------
    # Main flow transitions
    # ----------------------------------------
    # Increased minlen to 4 to push clusters further apart
    constraints >> Edge(label="approved use case", minlen="4") >> llm_prototype
    manual_sanity >> Edge(label="eval needs", minlen="4") >> risks
    metrics_cfg >> Edge(minlen="4") >> offline_store
    offline_scores >> Edge(label="choose config", minlen="4") >> llm_app
    llm_app >> Edge(label="emit metrics", minlen="4") >> metrics

    # Regression loops
    # constraint="false" is CRITICAL here to avoid messing up the layout
    incidents >> Edge(label="update scenarios", style="dashed", color="#B22222", constraint="false") >> risks
    incidents >> Edge(label="expand dataset", style="dashed", color="#B22222", constraint="false") >> offline_store
