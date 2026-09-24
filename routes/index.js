var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var careersController = require("../controllers/careersController");

//start
var dataInfo = null;
var { Partner, PortfolioProject } = require("../models");
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
      subTitle: "We support many industries. : Healthcare , retail , Multimedia etc",
      isIndustriesPage: true,
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
router.get("/portfolio", async function (req, res, next) {
  let projects = [];
  const featuredProjects = [
    {
      id: "indovyapar-customer",
      title: "IndoVyapar Customer",
      img: "/assets/img/indovyapar-customer-logo.png",
      imageFit: "contain",
      url: "https://www.indovyapar.com",
      desc: "IndoVyapar Customer is the shopper-facing marketplace experience — browse products from multiple vendors, search and filter catalogs, manage wishlist and cart, and complete secure checkout with order tracking and support.",
      modules: [
        "<strong>Smart Marketplace Browsing:</strong> Discover products across vendors with search, categories, filters, ratings, and personalized recommendations.",
        "<strong>Cart &amp; Checkout:</strong> Add items from multiple sellers, apply offers, choose delivery preferences, and complete payment including COD where available.",
        "<strong>Order Tracking:</strong> Follow order status from placement through shipping and delivery with clear timelines and notifications.",
        "<strong>Wishlist &amp; Profile:</strong> Save products, manage addresses, and keep account details ready for faster repeat shopping.",
        "<strong>Customer Support:</strong> Raise tickets, ask product questions, and get help without leaving the marketplace experience.",
        "<strong>Mobile App Experience:</strong> Shop on iOS and Android with a native-shell WebView experience tuned for IndoVyapar customers.",
      ],
      technology_used: "Next.js, React Native / Flutter shell, Prisma, MySQL, TypeScript",
    },
    {
      id: "indovyapar-vendor",
      title: "IndoVyapar Vendor",
      img: "/assets/img/indovyapar-vendor-logo.png",
      imageFit: "contain",
      url: "https://www.indovyapar.com/vendor",
      desc: "IndoVyapar Vendor is the seller platform — onboard with KYC, list and manage products, fulfill orders, track earnings and payouts, and grow a storefront on India's multi-vendor marketplace.",
      modules: [
        "<strong>Vendor Onboarding &amp; KYC:</strong> Register a seller account, submit business documents, and get approved to sell on the marketplace.",
        "<strong>Product Catalog Management:</strong> Create listings with images, pricing, stock, GST, variations, and submit products for admin moderation.",
        "<strong>Order Fulfillment:</strong> Accept orders, update processing and shipping status, and keep customers informed through the delivery lifecycle.",
        "<strong>Earnings &amp; Payouts:</strong> Track revenue, commission, settlements, and payout history from a dedicated vendor dashboard.",
        "<strong>Store Profile &amp; Settings:</strong> Manage store identity, bank details, notifications, and seller preferences in one place.",
        "<strong>Vendor Mobile App:</strong> Run day-to-day selling workflows from the IndoVyapar Vendor iOS/Android app shell.",
      ],
      technology_used: "Next.js, Expo / React Native, Prisma, MySQL, TypeScript",
    },
    {
      id: "coinarts",
      title: "CoinArts",
      img: "/assets/img/coinarts-logo.png",
      imageFit: "contain",
      url: null,
      desc: "CoinArts is a mobile order application for precious-metal coins and bars — browse catalog by metal and style, pick denominations by weight, build carts with live weight totals, and place or reorder wholesale-style orders from iPhone and iPad.",
      modules: [
        "<strong>Product Catalog:</strong> Browse gold, silver, and specialty coins/bars with search and filters for 3D/plain coins, colored silver, bars, trays, and more.",
        "<strong>Denomination Ordering:</strong> Select exact weights (5g, 10g, 20g, 50g, 100g, and beyond) per design and add quantities in one flow.",
        "<strong>Smart Cart:</strong> Review selected coins, adjust quantities, and see live totals for coin count and combined weight before placing an order.",
        "<strong>Order Management:</strong> Track order history with status, itemized weights, reorder shortcuts, and sheet/export actions for operations teams.",
        "<strong>Saved Orders:</strong> Save frequently ordered carts and reuse them later for faster repeat wholesale ordering.",
        "<strong>Cross-Device Apps:</strong> Optimized experience for iPhone and iPad with branded CoinArts catalog, cart, orders, and account navigation.",
      ],
      technology_used: "iOS, iPadOS, Mobile App Development, Order Management",
    },
  ];
  const featuredTitles = new Set(
    featuredProjects
      .map((p) => p.title.toLowerCase())
      .concat(["indovyapar", "opspick", "coin arts"])
  );

  function formatModuleBullet(text) {
    if (!text || typeof text !== "string") return text;
    if (text.includes("<strong>")) return text;
    const idx = text.indexOf(":");
    if (idx > 0 && idx < 80) {
      return "<strong>" + text.slice(0, idx + 1) + "</strong>" + text.slice(idx + 1);
    }
    return text;
  }

  try {
    const rows = await PortfolioProject.findAll({
      order: [["display_order", "ASC"], ["createdAt", "ASC"]],
    });
    projects = rows
      .map((p) => {
        const plain = p.get({ plain: true });
        const title = plain.title || "";
        const modules = (plain.modules || []).map(formatModuleBullet);
        return {
          id: plain.id,
          title,
          img: plain.image_url,
          desc: plain.description,
          modules,
          technology_used: Array.isArray(plain.technology_stack)
            ? plain.technology_stack.join(", ")
            : (plain.technology_stack || ""),
          url: null,
          imageFit: null,
        };
      })
      .filter((p) => !featuredTitles.has((p.title || "").toLowerCase()));
  } catch (err) {
    console.error("Portfolio fetch error:", err);
  }

  const fallback = dataInfo && dataInfo.portfolio_page;
  const fallbackProjects = ((fallback && fallback.projects) || [])
    .filter((p) => !featuredTitles.has((p.title || "").toLowerCase()))
    .map((p) => ({
      ...p,
      modules: (p.modules || []).map(formatModuleBullet),
    }));
  const rest = projects.length ? projects : fallbackProjects;

  res.render("portfolio", {
    layout: "contact_main",
    data: {
      title: (fallback && fallback.title) || "Portfolio",
      subTitle: (fallback && fallback.subTitle) || "Showcasing innovative solutions that drive success for our clients",
      projects: featuredProjects.concat(rest),
      isPortfolioPage: true,
    }
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
      isPartnersPage: true,
    }
  });
});

module.exports = router;
