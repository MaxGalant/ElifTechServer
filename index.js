const express = require("express");
const bodyParseer = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./config/db");
const PORT = 3001;
app.use(express.json());
app.use(bodyParseer.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    optionsSuccessStatus: 200,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
  // ["http://localhost:3000", "https://maxgalant.github.io/"]
);

app.get("/", (req, res) => {
  res.send("FFGF");
});

app.get("/bank", (req, res) => {
  const sqlSelect = "SELECT * FROM  `bank`";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.get("/bank/:Id", (req, res) => {
  let ID = Number(req.params.Id);
  const sqlSelect = "SELECT * FROM  `bank` WHERE Id=?";
  db.query(sqlSelect, ID, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.post("/create_bank", (req, res) => {
  const name = req.body.name;
  const interest_rate = req.body.interest_rate;
  const max_loan = req.body.max_loan;
  const min_down_payment = req.body.min_down_payment;
  const loan_term = req.body.loan_term;

  const sqlInsert =
    "INSERT INTO bank (name,interest_rate,max_loan,min_down_payment,loan_term) VALUE(?,?,?,?,?)";
  db.query(
    sqlInsert,
    [name, interest_rate, max_loan, min_down_payment, loan_term],
    (err, result) => {
      if (err) {
        console.log("Error in CREATING BANK is", err);
      }
      res.send(result);
      console.log("Result", result);
    }
  );
});

app.delete("/delete/bank/:Id/:bankName", (req, res) => {
  const name = req.params.bankName;
  const Id = Number(req.params.Id);
  const sqlDelete = "DELETE FROM bank WHERE name=? AND Id=?";
  db.query(sqlDelete, [name, Id], (err, result) => {
    if (err) {
      console.log("Erorr          ", err);
    } else {
      res.send(result);
      console.log("Delete", result);
    }
  });
});

app.put("/update/name/:Id", (req, res) => {
  const ID = Number(req.params.Id);
  const name = req.body.name;
  const sqlUpdate = "UPDATE bank SET name=? WHERE Id=?  ";
  db.query(sqlUpdate, [name, ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});
app.put("/update/rate/:Id", (req, res) => {
  const ID = Number(req.params.Id);
  const rate = req.body.rate;
  const sqlUpdate = "UPDATE bank SET interest_rate=? WHERE Id=?  ";
  db.query(sqlUpdate, [rate, ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

      console.log(result);
    }
  });
});
app.put("/update/max_loan/:Id", (req, res) => {
  const ID = Number(req.params.Id);
  const max_loan = req.body.max_loan;
  const sqlUpdate = "UPDATE bank SET max_loan=? WHERE Id=?  ";
  db.query(sqlUpdate, [max_loan, ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

      console.log(result);
    }
  });
});

app.put("/update/min_loan/:Id", (req, res) => {
  const ID = Number(req.params.Id);
  const min_loan = req.body.min_loan;
  const sqlUpdate = "UPDATE bank SET min_down_payment=? WHERE Id=?  ";
  db.query(sqlUpdate, [min_loan, ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

      console.log(result);
    }
  });
});
app.put("/update/loan_term/:Id", (req, res) => {
  const ID = Number(req.params.Id);
  const loan_term = req.body.loan_term;
  const sqlUpdate = "UPDATE bank SET loan_term=? WHERE Id=?  ";
  db.query(sqlUpdate, [loan_term, ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

      console.log(result);
    }
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Running on port ${PORT}`);
});
