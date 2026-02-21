from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/surprise")
def surprise():
    return render_template("surprise.html")

@app.route("/letters")
def letters():
    return render_template("letters.html")

@app.route("/proposal")
def proposal():
    return render_template("proposal.html")

if __name__ == "__main__":
    app.run(debug=True)
