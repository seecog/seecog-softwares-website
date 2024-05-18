var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  console.log("Inside home 33")
  res.render('home3', { layout: "main"});

});

router.get('/technologies', function(req, res, next) {
  res.render("technologies",{layout :"contact_main",data : {
    title : "Our technologies",
    subTitle : "React Js,Node Js,Java , Spring,Data Science, Machine learning "
  }})
});

router.get('/contact', function(req, res, next) {
  res.render("contact",{layout :"contact_main",data : {
    title : "Contact us",
    subTitle : "One stop solution"
  }})
});

router.get('/industries', function(req, res, next) {
  res.render("industries",{layout :"contact_main",data : {
    title : "Industries",
    subTitle : "We support many industries. : Healthcare , retail , Multimedia etc"
  }})
});

router.get('/services', function(req, res, next) {
  res.render("services",{layout :"contact_main",data : {
    title : "Our services",
    subTitle : "We provide software development , ERP solutions"
  }})
});
router.get('/portfolio', function(req, res, next) {
  res.render("portfolio",{layout :"contact_main",data : {
    title : "Portfolio",
    subTitle : "We support many industries. : Healthcare , retail , Multimedia etc",
    projects : [
      {
      id : 1,  
      left : true,
      img : "./assets/img/flok2.png",
      // name : "Flok22",
      technology_used : "Smartphone, iOS, Android App Development, React, Mobile App, React Native",
      title : "Flok22",
      desc : "The collaboration between our team and the client culminates in the creation of Flok22, an innovative dating app that connects individuals through shared locations. The project's success is evident through: Location-Centric Connections: Flok22 successfully introduces a novel way of dating, allowing users to connect based on shared physical locations.",
      modules : [
        "Location-Based Matching: Developing a sophisticated algorithm that matches users based on their shared physical locations, enhancing compatibility. ",
        "User-Friendly Interface: Designing an intuitive and visually appealing interface that enables users to easily browse matches and initiate conversations.",
        "Real-Time Check-ins: Implementing real-time check-in features that allow users to indicate their current location, facilitating the connection process.",
        "Chat Integration: Creating a seamless chat system that enables matched users to engage in conversations and get to know each other better."
      ]
      },
      {
        id : 2,
        left : false,
        img : "./assets/img/dental.png",
        title : "Dentalhive",
        desc : "The collaboration between our team and the client culminates in the creation of Dentalhive, a transformative recruitment app for the dental industry.Innovative Dental Recruitment The app's success lies in its innovative approach to dental industry recruitment, transforming the way talents and clinics connect. In conclusion, the collaboration between our team and the client has led to Dentalhive's development, revolutionising dental industry recruitment. Its success establishes it as an essential tool for dental clinics and talents, offering them a platform to connect, collaborate, and streamline the job placement process, ultimately enhancing the dental community's growth and success.",
        technology_used : " React,  React Native",
        modules : [
          "Empowered Talents: Dental talents benefit from access to a wide range of job opportunities, tailored to their skills and preferences. ",
          "Simplified Communication: The app's features enable transparent communication between dental clinics and talents, enhancing collaboration.",
          "Growing User Base: The platform gains traction among dental clinics and talents, attracting a growing community of users committed to efficient job placement.",
           ]
      },
      {
        id : 3,
        img : "./assets/img/paytoall.png",
        left : true,
        title : "PayToAll",
        desc : "PayToAll's specialty is to provide the recharge without a Gmail or Facebook interface. PayToAll PAY is one of the best recharge-level websites in India. PayToAll PAY provides the user with multiple operators recharges in a single balance. It means the retailer doesn't have to invest separately for each operator hence saving the hassle of maintaining separate sims and mobiles for different operators. The recharge solutions have been developed and scrubbed to ensure their availability at no extra cost to the end user so that the user can transact securely from any location at his convenience. PayToAll PAY Service came into existence as one of the fastest online mobile recharge service providers in India.",
        technology_used : "HTML, CSS, JavaScript, TypeScript, React Native",
        modules : [
          "We provide online mobile recharges for Airtel, Idea, Vodafone, BSNL, RelianceJio and other can be recharged using our service. ",
          "We provide online DTH recharges for AirtelDTH, DishTV,TataSky, SunDirect,VideoconD2H .",
          "Instant money transfer across all the major banks in India can be done within seconds by registering with us.",
        ]
      },
      {
        id : 4,
        left : false,
        img : "./assets/img/toal.png",
        title : "The Royal Opticals",
        desc : "The Riter Tool is a software tool designed to support students, researchers, and academic writers throughout their writing process. It provides a comprehensive suite of resources, including a writing style guide, citation and bibliography generator, word processor, and research organization tools. Additionally, it features grammar tools to help writers produce grammatically correct and error-free text, with a customizable grammar checker that identifies and suggests corrections for grammar, punctuation, and spelling errors, as well as suggestions for improving sentence structure, word choice, and other elements of writing style.",
        technology_used : "HTML, CSS, JavaScript, TypeScript, React Native",
        modules : [
          "The goal of this tool is to help writers produce high-quality, clear, and error-free writing, essential for academic success.",
          "Tools like these can be very helpful for organizing ideas, generating citations, and improving writing skills. If you have a specific question or need information about a particular tool, feel free to ask!",
          "There are various content writing tools and software available that can assist with generating, editing, or optimizing content.",
          ]
      },
      {
        id : 5,
        left : true,
        img : "./assets/img/community.png",
        title : "Grand Community",
        desc : "It launched an influencer marketing campaign for its new store opening, and is sent over 300 influencers. The main goal of this campaign was to build brand awareness and generate buzz around the new store, create a strong social media presence, engage with the target audience, and encourage customers to share their store experiences online.",
        technology_used : "HTML, CSS, JavaScript, TypeScript, React Native",
        modules : [
          "It provides World-class support and 24/7Live campaign management services, in order to coordinate and manage direct follow-up with the best service that the user needs anytime throughout the day.",
          "One can launch their campaigns in any country, city, or area, or in several places around the globe, at the same time, from one place.",
          " Start your success story now, and join over 1000 successful brands, locally and globally, with Grand Community.",
          ]
      },
      {
        id : 6,
        left : false,
        img : "./assets/img/worldcoin.png",
        title : "World Coin Index",
        desc : "WorldCoinIndex is a cryptocurrency source with price information and news. It supplies fast and reliable price information. It has listed over 1500 cryptocurrencies and their platforms are connected to more than 100 cryptocurrency exchanges and over 7000 cryptocurrency markets. All prices are denoted in BTC and in 13 fiat currencies: USD, EUR, CNY, GBP, RUB, CAD, JPY, HKD, BRL, IDR, AUD, KRW, INR, TRY and ZAR. In addition to price information, their platform also supports quick access to key information of individual cryptocurrencies like their website, Block Explorer, forum, Twitter, and Reddit feeds.",
        technology_used : "HTML, CSS, JavaScript, TypeScript, React Native",
        modules : [
          "You can automatically track the true performance of all your listed cryptocurrencies over 100 global crypto exchanges.",
          "You can add portfolios from your investments or create manual portfolios to test out particular strategies.",
          "The portfolio tracker is a simple and effective way to monitor cryptocurrencies. We got a simple mode and an advanced mode.",
          ]
      },
      {
        id : 7,
        left : true,
        img : "./assets/img/cetas.png",
        title : "Cetas Health Care",
        desc : "Cetas Healthcare is a leading and innovative healthcare company dedicated to providing high-quality medical solutions and services. With a commitment to improving the health and well-being of individuals, Cetas Healthcare focuses on a wide range of healthcare domains, including medical devices, pharmaceuticals, telemedicine, and healthcare management solutions.",
        technology_used : "HTML, CSS, JavaScript, TypeScript, React Native",
        modules : [
          "Our global presence ensures that we can provide insights that are not only relevant but also adaptable to diverse healthcare markets around the world.",
          "We take immense pride in our 100% client retention rate, a testament to our unwavering dedication to delivering exceptional results.",
          "We value the partnerships we build with our clients, working closely together to identify the best strategies and solutions for their unique needs.",
          ]
      },
      {
        id : 8,
        left : false,
        img : "./assets/img/multi.png",
        title : "Multi serving app",
        desc : "It's a multi-serving app that contains details of most essential commodities that can be easily purchased and exchanged. One can get reliable information regarding live rates, market views, the latest news, and real-time stock as well as tips with regard to the commodity.",
        technology_used : "HTML, CSS, JavaScript, TypeScript, React Native",
        modules : [
          "Develop the module that serves content or functionality to different platforms.",
          "Implement responsive design for web applications.",
          "Use platform-specific APIs for mobile or desktop applications.",
          ]
      },
      {
        id : 9,
        left : true,
        img : "./assets/img/instacash.png",
        title : "World Coin Index",
        desc : "InstaCash is a platform to sell used or old mobile phones which allows instant mobile selling plus trading. The intelligent algorithm detects the best re-sale value on the basis of the phone’s condition and functionality. It works very conveniently in a flexible environment as it picks up the phone within 24 hours from the user's doorstep and pays the best possible price. InstaCash is a smart choice that declutters the old phone and recoup some of its value.",
        technology_used : "HTML, CSS, JavaScript, TypeScript, React Native",
        modules : [
          "Safety starts with understanding how developers collect and share your data. Data privacy and security practices may vary based on your use, region and age The developer provided this information and may update it over time.",
          "Our intelligent algorithm will diagnose your old phone and accurately determine the best re-sale value given your phone’s condition and functionality.",
          ]
      },
      {
        id : 10,
        left : false,
        img : "./assets/img/runners.png",
        title : "Runner Boys",
        desc : "Runner Boys is the latest demanding app that helps to meet the quickest and most efficient Runner for the user’s tasks. The user can errand their items related to Groceries, Bank Works, Package Delivery, Items Pickup, Food Delivery, as well as Roadside Assistance. For doing all these works a runner boy is assigned and the user can schedule the errand now or assign the runner later plus these runners are extremely trustworthy and the customer can pay via online or offline mode.",
        technology_used : "HTML, CSS, JavaScript, TypeScript, React Native",
        modules : [
          "We will help you meet the quickest and most efficient Runner for your task.",
          "Runner Boys is the latest on-demand errand running app that connects you to India's fastest growing network of Runners.",
          "Whatever your errand is - Groceries, Bank work, Package delivery, Items pickup, Food delivery, Roadside Assistance, Specialized skills or even hitch a ride with our Runners; we have the right Runner Boy for you.",
          ]
      },
      {
        id : 11,
        left : true,
        img : "./assets/img/rootscare.png",
        title : "Rootscare for Patients",
        desc : "RootsCare is a patient-centric healthcare service that goes beyond traditional medical care to address the holistic well-being of individuals. With a commitment to nurturing the roots of good health, RootsCare offers a comprehensive and personalized approach to patient care. Our team of dedicated healthcare professionals, including doctors, nurses, and specialists, focuses on understanding each patient's unique needs, values, and aspirations. We provide compassionate and evidence-based medical treatment while considering the emotional, social, and lifestyle factors that impact health.",
        technology_used : "HTML, CSS, JavaScript, TypeScript, React Native",
        modules : [
          "Consult with your doctor through a video call or home visit.",
          "Book Nurses, Nurse Assistants, Babysitters, and Physiotherapists as you need on an hourly-based or task-based.",
          "Book diagnostic tests and full body checkups.",
          "Get real-time reminders about your upcoming appointment",
          ]
      },
      {
        id : 12,
        left : false,
        img : "./assets/img/rakwire.png",
        title : "Rakwireless",
        desc : "Development of a desktop application that was supposed to control a real device, which in turn received and executed certain commands: data collection, flashing, reboot, settings management, etc. This device is used in the agricultural sector to collect data. Many IoT products carry the claim of being built for the end user without requiring deep technical knowledge. When speaking to customers and other practitioners, we realized that there were still pain points when it came to configuring hardware. WisToolBox replaces tedious and error-prone sequences of AT commands with a solution that requires no coding at all.",
        technology_used : "HTML, CSS, JavaScript, TypeScript,Node.js ,Redux, React ",
        modules : [
          "WisToolBox provides a suite of tools for RAK end devices.",
          "These tools can be used to configure, update, and program IoT hardware from your desktop or smartphone.",
          "This software reduces the barriers to entry for less experienced users while allowing professionals to manage their deployments more diligently.",
          ]
      },
      {
        id : 13,
        left : true,
        img : "./assets/img/robot.png",
        title : "Talking Method",
        desc : "Robotify is all in the browser, so there is no need for any downloads, and can be used on any device from laptops, to tablets, and even your smartphone. Just simply log in, pick a lesson, and get coding - it is easy as that! ",
        technology_used : "Microsoft SQL Server  , JavaScript, Next.js , React Native, Redux, NodeJS Framework, MongoDB ",
        modules : [
          "Robotify guides learners to produce original ideas, with the tools, resources, & freedom to grow their capacity for creativity, critical thinking, problem-solving, and collaboration skills. ",
          "Robotify offers a best-in-class, 3D browser-based robotics simulator to teach coding in Blockly or Python.",
        ]
      },
      {
        id : 14,
        left : false,
        img : "./assets/img/foot.png",
        title : "A Foot In The Door",
        desc : "A Foot in the Door is a web platform that connects job seekers with opportunities in the film and television industry. The platform is designed to help individuals who are interested in pursuing a career in the entertainment industry but may not have the necessary connections or experience to get started.Through A Foot in the Door, job seekers can create a profile that highlights their skills, experience, and career aspirations. They can also browse job listings and apply for positions that match their qualifications. The platform offers a wide range of job opportunities, from entry-level positions to more advanced roles, in areas such as production, post-production, casting, and more. Employers can also use A Foot in the Door to post job listings and search for candidates who meet their specific hiring needs. The platform provides a streamlined process for managing job applications and communicating with candidates, making it easier for employers to find and hire the right talent for their projects.",
        technology_used : "HTML, CSS, JavaScript, TypeScript, React ",
        modules : [
          " A Foot in the Door aims to bridge the gap between job seekers and employers in the film and television industry, providing a valuable resource for individuals who are looking to break into this competitive field.",
          "A Foot in the Door is a next-generation job search platform dedicated exclusively to job seekers with 0-5 years of work experience.",
          ]
      },
      {
        id : 15,
        left : true,
        img : "./assets/img/planned.png",
        title : "Planeed",
        desc : "Planeed - Social Media Sustainability app developed using React Native. Its a Sustainability app where can inform yourself about sustainable topics, get inspired by ideas and sustainable behavior.In Planeed you can inform yourself about sustainable topics, get inspired by ideas and sustainable behaviors or become active yourself.        ",
        technology_used : "HTML, CSS, JavaScript, TypeScript, Native App Development,React Native, Angular",
        modules : [
          " the app and turn your social media time into real impact for our planet. Browse through interesting news, cool posts, sustainable ideas and become part of a like-minded community.",
          "Download planeed and discover your role in shaping a better future.",
          ]
      },
    ].reverse()
  }})
});
router.get('/culture', function(req, res, next) {
  console.log('Inside culture *** ');
  res.render("culture",{layout :"contact_main",data : {
    title : "Our Culture",
    subTitle : "We work as a family"
  }})
});

module.exports = router;
