var express = require("express");
var router = express.Router();
// var axios = require("axios");
var fs = require("fs");
var path = require("path");

//start
var dataInfo = null;
function getDataSet() {
  const filePath = path.join(__dirname, "dataset/data.json");
//   console.log("the fie : ", filePath);
  fs.readFile(filePath, "utf8", (err, data) => {
    // console.log("The data is : ", data);
    dataInfo = JSON.parse(data);
  });
}

getDataSet();
//end

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("home3", { layout: "main" });
});

router.get("/technologies", function (req, res, next) {
  res.render("technologies", {
    layout: "contact_main",
    data: {
      title: "Our technologies",
      subTitle:
        "React Js,Node Js,Java , Spring,Data Science, Machine learning ",
    },
  });
});

router.get("/contact", function (req, res, next) {
  console.log("The contact page info : ",dataInfo,dataInfo.contact_page)
  res.render("contact", {
    layout: "contact_main",
    data: dataInfo.contact_page,
  });
});

router.get("/industries", function (req, res, next) {
  res.render("industries", {
    layout: "contact_main",
    data: {
      title: "Industries",
      subTitle:
        "We support many industries. : Healthcare , retail , Multimedia etc",
    },
  });
});

router.get("/services", function (req, res, next) {
  res.render("services", {
    layout: "contact_main",
    data: {
      title: "Our services",
      subTitle: "We provide software development , ERP solutions",
    },
  });
});
router.get("/portfolio", function (req, res, next) {
  res.render("portfolio", {
    layout: "contact_main",
    data: dataInfo.portfolio_page
  });
});
router.get("/culture", function (req, res, next) {
  console.log("Inside culture *** ");
  res.render("culture", {
    layout: "contact_main",
    data: dataInfo.culture_page
  });
});

module.exports = router;
