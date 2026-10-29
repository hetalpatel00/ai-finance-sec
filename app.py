
import streamlit as st

st.set_page_config(
    page_title="AI Finance SEC",
    page_icon="💰",
    layout="wide"
)

st.title("💰 AI Finance")
st.subheader("Smart Personal Finance Assistant")
st.write("Your personal dashboard for budgeting, expenses, and investments.")

st.sidebar.title("Navigation")
page = st.sidebar.radio(
    "Select a feature",
    ["Dashboard", "Expense Tracker", "Budget Planner", "SIP Calculator", "AI Finance Assistant"]
)

if "expenses" not in st.session_state:
    st.session_state.expenses = []

if page == "Dashboard":
    st.header("Financial Dashboard")
    income = st.number_input("Monthly Income (₹)", min_value=0, value=30000)
    total = sum(x["amount"] for x in st.session_state.expenses)
    savings = income - total

    a, b, c = st.columns(3)
    a.metric("Monthly Income", f"₹{income:,}")
    b.metric("Total Expenses", f"₹{total:,}")
    c.metric("Available Balance", f"₹{savings:,}")

    if st.session_state.expenses:
        st.subheader("Expense Analysis")
        st.bar_chart({
            x["name"]: x["amount"] for x in st.session_state.expenses
        })
    else:
        st.info("Start by adding an expense in Expense Tracker.")

elif page == "Expense Tracker":
    st.header("Expense Tracker")
    with st.form("expense_form"):
        name = st.text_input("Expense name")
        amount = st.number_input("Amount (₹)", min_value=0, value=100)
        category = st.selectbox(
            "Category", ["Food", "Travel", "Shopping", "Bills", "Other"]
        )
        submitted = st.form_submit_button("Add Expense")

        if submitted:
            if name.strip() and amount > 0:
                st.session_state.expenses.append({
                    "name": name,
                    "amount": amount,
                    "category": category
                })
                st.success("Expense added successfully!")
            else:
                st.error("Enter an expense name and an amount above zero.")

    if st.session_state.expenses:
        st.dataframe(st.session_state.expenses, use_container_width=True)

elif page == "Budget Planner":
    st.header("Monthly Budget Planner")
    budget = st.number_input("Monthly Budget (₹)", min_value=0, value=10000)
    total = sum(x["amount"] for x in st.session_state.expenses)
    remaining = budget - total

    st.metric("Budget Remaining", f"₹{remaining:,}")
    st.progress(min(total / budget, 1.0) if budget > 0 else 0)

    if remaining < 0:
        st.warning("You have exceeded your budget.")
    else:
        st.success("You are within your budget.")

elif page == "SIP Calculator":
    st.header("SIP Investment Calculator")
    monthly = st.number_input("Monthly SIP (₹)", min_value=0, value=5000)
    years = st.number_input("Investment Period (years)", min_value=1, value=10)
    rate = st.number_input("Expected Annual Return (%)", min_value=0.0, value=12.0)

    if st.button("Calculate Returns"):
        n = years * 12
        r = rate / 1200
        invested = monthly * n
        future = invested if r == 0 else monthly * (((1 + r) ** n - 1) / r) * (1 + r)
        st.metric("Total Invested", f"₹{invested:,.2f}")
        st.metric("Estimated Future Value", f"₹{future:,.2f}")
        st.metric("Estimated Returns", f"₹{future - invested:,.2f}")
        st.caption("Illustrative estimate only; actual investment returns are not guaranteed.")

elif page == "AI Finance Assistant":
    st.header("AI Finance Assistant")
    st.write("Explore basic financial education.")
    question = st.selectbox("Choose a question", [
        "How can I save money?",
        "What is compound interest?",
        "What is a SIP?",
        "What is an emergency fund?"
    ])

    if st.button("Get Guidance"):
        answers = {
            "How can I save money?": "Track expenses, set a budget, and save regularly.",
            "What is compound interest?": "Compound interest earns returns on your initial amount and accumulated returns.",
            "What is a SIP?": "A Systematic Investment Plan lets you invest a fixed amount at regular intervals.",
            "What is an emergency fund?": "It is money set aside for unexpected expenses."
        }
        st.info(answers[question])

st.divider()
st.caption("AI Finance SEC Project | For educational purposes only.")

