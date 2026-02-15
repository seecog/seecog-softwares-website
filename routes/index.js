var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var careersController = require("../controllers/careersController");

//start
var dataInfo = null;
var { Partner } = require("../models");
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
  console.log("The contact page info : ", dataInfo, dataInfo.contact_page)
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

router.get("/our-products", function (req, res, next) {
  const productsData = (dataInfo && dataInfo.products_page) || {
    title: "Our Products",
    subTitle: "Innovative solutions to streamline your business",
    products: [
      {
        id: 1,
        icon: "bx bx-user-circle",
        image: "/assets/img/services/mini-hr-360.png",
        title: "Mini HR 360",
        description: "A comprehensive HR management solution to handle recruitment, payroll, attendance, leave management, and employee records.",
        url: "https://minihr360.seecogsoftwares.com",
        buttonText: "Visit Mini HR 360",
      },
      {
        id: 2,
        icon: "bx bx-group",
        image: "/assets/img/services/mini-crm-360.png",
        title: "Mini CRM 360",
        description: "Manage customer relationships, track leads, automate sales pipelines, and grow your business with powerful CRM tools.",
        url: "https://minicrm360.seecogsoftwares.com",
        buttonText: "Visit Mini CRM 360",
      },
      {
        id: 3,
        icon: "bx bx-package",
        title: "Mini ERP 360",
        description: "End-to-end enterprise resource planning for inventory, procurement, finance, and operations.",
        url: "https://minierp360.seecogsoftwares.com",
        buttonText: "Visit Mini ERP 360",
      },
    ],
  };
  res.render("our-products", {
    layout: "contact_main",
    data: productsData,
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

router.get("/my-digital-card", function (req, res, next) {
  const contactData = (dataInfo && dataInfo.contact_page) || {
    email: "info@seecogsoftwares.com",
    contact: "+91 7625067691",
    address: "Site No. 26, Prestige Cube Building, Laskar, Hosur Rd, Adugodi, Koramangala, Bengaluru, Karnataka 560030"
  };
  res.render("my-digital-card", {
    layout: "contact_main",
    data: {
      title: "My Digital Card",
      subTitle: "Your digital identity at a glance",
      companyName: "Seecog Softwares Pvt Ltd",
      ...contactData
    }
  });
});

router.get("/culture", function (req, res, next) {
  res.render("culture", {
    layout: "contact_main",
    data: dataInfo.culture_page
  });
});

router.get("/careers", careersController.getCareers);
router.post("/careers/apply", careersController.postApply);

router.get("/partners", async function (req, res, next) {
  let partners = [];
  try {
    partners = await Partner.findAll({
      order: [["display_order", "ASC"], ["createdAt", "ASC"]],
    });
  } catch (err) {
    console.error("Partners fetch error:", err);
  }
  const portfolio = (dataInfo && dataInfo.portfolio_page && dataInfo.portfolio_page.projects) || [];
  const selectedProjects = portfolio.slice(0, 3);
  res.render("partners", {
    layout: "contact_main",
    data: {
      title: "Partners",
      subTitle: "Our trusted partners and valued clients",
      selectedProjects: selectedProjects,
      partners: partners.map((p) => p.get({ plain: true })),
    }
  });
});

module.exports = router;
