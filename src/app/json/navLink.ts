export const navbarLinks = {
  navbar: [
    {
      id: 1,
      title: "Home",
      href: "/",
    },

    {
      id: 101,
      title: "Management",
      href: "/universities-list/management",
      submenu: [
        {
          id: 102,
          title: "Exams",
          href: "#",
          submenu: [
            {
              id: 103,
              title: "Joint Entrance Management Aptitude Test (JEMAT)",
              href: "/study/exam/jemat-joint-entrance-management-aptitude-test",
            },
            {
              id: 104,
              title: "Xavier Aptitude Test (XAT)",
              href: "/study/exam/xat-xavier-aptitude-test",
            },
            {
              id: 105,
              title: "Management Aptitude Test (MAT)",
              href: "/study/exam/mat-management-aptitude-test",
            },
            {
              id: 210,
              title: "KIITEE Management",
              href: "/study/exam/kiitee-management",
            },
          ],
        },
        {
          id: 106,
          title: "Popular Courses",
          href: "#",
          submenu: [
            {
              id: 107,
              href: "/universities-list/management?courseParam=mba",
              title: "MBA [Masters of business administration]",
            },
            {
              id: 108,
              href: "/universities-list/management?courseParam=bms",
              title: "BMS [Bachelors of management studies]",
            },
            {
              id: 109,
              href: "/universities-list/management?courseParam=bba",
              title: "BBA [Bachelors of business administration]",
            },
            {
              id: 110,
              href: "/universities-list/management?courseParam=mha",
              title: "MHA [Masters of Hospital administration]",
            },
            {
              id: 111,
              href: "/universities-list/management?courseParam=mms",
              title: "MMS [Masters of management studies]",
            },
          ],
        },
        {
          id: 112,
          title: "Mba Colleges by Location",
          href: "#",
          submenu: [
            {
              id: 113,
              href: "/universities-list/management?locationsParam=maharashtra&courseParam=mba",
              title: "MBA Colleges in Maharashtra",
            },
            {
              id: 114,
              href: "/universities-list/management?locationsParam=tamil-nadu&courseParam=mba",
              title: "MBA Colleges in Tamil Nadu",
            },
            {
              id: 115,
              href: "/universities-list/management?locationsParam=jharkhand&courseParam=mba",
              title: "MBA Colleges in Jharkhand",
            },
            {
              id: 116,
              href: "/universities-list/management?locationsParam=delhi-ncr&courseParam=mba",
              title: "MBA Colleges in Delhi-NCR",
            },
            {
              id: 117,
              href: "/universities-list/management?locationsParam=uttar-pradesh&courseParam=mba",
              title: "MBA Colleges in Uttar Pradesh",
            },
            {
              id: 118,
              href: "/universities-list/management?locationsParam=rajasthan&courseParam=mba",
              title: "MBA Colleges in Rajasthan",
            },
            {
              id: 119,
              href: "/universities-list/management?locationsParam=andhra-pradesh&courseParam=mba",
              title: "MBA Colleges in Andhra Pradesh",
            },
            {
              id: 120,
              href: "/universities-list/management?locationsParam=karnataka&courseParam=mba",
              title: "MBA Colleges in Karnataka",
            },
          ],
        },
        {
          id: 121,
          title: "Top Ranked Colleges",
          href: "#",
          submenu: [
            {
              id: 122,
              href: "/universities-list/management",
              title: "Top Management Colleges in India",
            },
            {
              id: 123,
              href: "/universities-list/management?ownershipParam=private",
              title: "Top Private Management Colleges in India",
            },
            {
              id: 124,
              href: "/universities-list/management?ownershipParam=goverment",
              title: "Top Government Management Colleges in India",
            },
            {
              id: 125,
              href: "/universities-list/management?cityParam=mumbai",
              title: "Top Management Colleges in Mumbai",
            },
            {
              id: 126,
              href: "/universities-list/management?cityParam=pune",
              title: "Top Management Colleges in Pune",
            },
            {
              id: 127,
              href: "/universities-list/management?cityParam=hyderabad",
              title: "Top Management Colleges in Hyderabad",
            },
            {
              id: 128,
              href: "/universities-list/management?cityParam=chennai",
              title: "Top Management Colleges in Chennai",
            },
            {
              id: 129,
              href: "/universities-list/management?cityParam=kolkata",
              title: "Top Management Colleges in Kolkata",
            },
            {
              id: 130,
              href: "/universities-list/management?cityParam=delhi",
              title: "Top Management Colleges in Delhi",
            },
            {
              id: 131,
              href: "/universities-list/management?cityParam=kerala",
              title: "Top Management Colleges in Kerala",
            },
          ],
        },
      ],
    },
    {
      id: 152,
      title: "Medical",
      href: "/universities-list/medical",
      submenu: [
        {
          id: 153,
          title: "Exams",
          href: "#",
          submenu: [
            {
              id: 154,
              title:
                "National Eligibility cum Entrance Test Postgraduate (NEET PG)",
              href: "/study/exam/neet-pg-national-eligibility-cum-entrance-test-for-post-graduate",
            },
            // {
            //   id: 155,
            //   title:
            //     "Institute of National Importance Combined Entrance Test (INI CET)",
            //   href: "/study/exam/ini-cet",
            // },
            {
              id: 156,
              title:
                "National Eligibility cum Entrance Test Undergraduate (NEET UG)",
              href: "/study/exam/neet-national-eligibility-cum-entrance-test",
            },
            // {
            //   id: 157,
            //   title:
            //     "All India Institute of Medical Sciences Postgraduate (AIIMS PG)",
            //   href: "/study/exam/aiims-pg",
            // },
            // {
            //   id: 158,
            //   title:
            //     "Postgraduate Institute of Medical Education and Research (PGIMER)",
            //   href: "/study/exam/pgimer",
            // },
            {
              id: 159,
              title: "All India AYUSH Postgraduate Entrance Test (AIAPGET)",
              href: "/study/exam/aiapget-all-india-ayush-post-graduate-entrance-test",
            },
          ],
        },
        {
          id: 160,
          title: "Popular Courses",
          href: "#",
          submenu: [
            {
              id: 161,
              href: "/universities-list/medical?courseParam=bmlt",
              title: "Bachelor in Medical Laboratory Technology",
            },
            {
              id: 162,
              href: "/universities-list/medical?courseParam=bpt",
              title: "Bachelor in Physiotherapy",
            },
            {
              id: 163,
              href: "/universities-list/medical?courseParam=bds",
              title: "Bachelor of Dental Surgery",
            },
            {
              id: 164,
              href: "/universities-list/medical?courseParam=bams",
              title: "Bachelor of Ayurvedic Medicine and Surgery",
            },
            {
              id: 165,
              href: "/universities-list/medical?courseParam=mbbs",
              title: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
            },
            {
              id: 166,
              href: "/universities-list/medical?courseParam=bhms",
              title: "Bachelor of Homeopathic Medicine and Surgery",
            },
          ],
        },
        {
          id: 167,
          title: "Top Ranked Colleges",
          href: "#",
          submenu: [
            {
              id: 168,
              href: "/universities-list/medical?ownershipParam=private",
              title: "Top Private Medical Colleges in India",
            },
            {
              id: 169,
              href: "/universities-list/medical?ownershipParam=government",
              title: "Top Government Medical Colleges in India",
            },
            {
              id: 170,
              href: "/universities-list/medical?cityParam=mumbai",
              title: "Top Medical Colleges in Mumbai",
            },
            {
              id: 171,
              href: "/universities-list/medical?cityParam=pune",
              title: "Top Medical Colleges in Pune",
            },
            {
              id: 172,
              href: "/universities-list/medical?cityParam=delhi",
              title: "Top Medical Colleges in Delhi",
            },
            {
              id: 173,
              href: "/universities-list/medical?cityParam=chennai",
              title: "Top Medical Colleges in Chennai",
            },
            {
              id: 174,
              href: "/universities-list/medical?cityParam=kolkata",
              title: "Top Medical Colleges in Kolkata",
            },
            {
              id: 175,
              href: "/universities-list/medical?cityParam=bangalore",
              title: "Top Medical Colleges in Bangalore",
            },
            {
              id: 176,
              href: "/universities-list/medical?cityParam=hyderabad",
              title: "Top Medical Colleges in Hyderabad",
            },
          ],
        },
      ],
    },
    {
      id: 177,
      title: "Engineering",
      href: "/universities-list/engineering",
      submenu: [
        {
          id: 178,
          title: "Exams",
          href: "#",
          submenu: [
            {
              id: 179,
              title: "Joint Entrance Exam (JEE) Mains",
              href: "/study/exam/jee-main-joint-entrance-examination-main",
            },
            {
              id: 180,
              title: "Joint Entrance Exam (JEE) Advanced",
              href: "/study/exam/jee-advanced-joint-entrance-exam-advanced",
            },
            // {
            //   id: 181,
            //   title: "Graduate Aptitude Test in Engineering (GATE)",
            //   href: "/study/exam/gate",
            // },
            // {
            //   id: 182,
            //   title:
            //     "Consortium of Medical, Engineering and Dental Colleges of Karnataka Undergraduate Entrance Test (COMEDK UGET)",
            //   href: "/study/exam/comedk-uget",
            // },
            // {
            //   id: 183,
            //   title: "MHT CET",
            //   href: "/study/exam/mht-cet",
            // },
            {
              id: 184,
              title:
                "Vellore Institute of Technology Engineering Entrance Examination (VITEEE)",
              href: "/study/exam/viteee-vit-engineering-entrance-exam",
            },
            {
              id: 185,
              title:
                "Birla Institute of Technology and Science Admission Test (BITSAT)",
              href: "/study/exam/bits-hd-bits-hd-admission-test",
            },
          ],
        },
        {
          id: 186,
          title: "Popular Courses",
          href: "#",
          submenu: [
            {
              id: 187,
              href: "/study/course/computer-science-engineering",
              title: "Computer Science Engineering",
            },
            {
              id: 188,
              href: "/study/course/civil-engineering",
              title: "Civil Engineering",
            },
            {
              id: 189,
              href: "/study/course/mechanical-engineering",
              title: "Mechanical Engineering",
            },
            {
              id: 190,
              href: "/study/course/electrical-engineering",
              title: "Electrical Engineering",
            },
            {
              id: 191,
              href: "/study/course/information-technology",
              title: "Information Technology",
            },
          ],
        },
        {
          id: 192,
          title: "Top Ranked Colleges",
          href: "#",
          submenu: [
            {
              id: 193,
              href: "/universities-list/engineering?ownershipParam=private",
              title: "Top Private Engineering Colleges in India",
            },
            {
              id: 194,
              href: "/universities-list/engineering?ownershipParam=government",
              title: "Top Government Engineering Colleges in India",
            },
            {
              id: 195,
              href: "/universities-list/engineering?cityParam=mumbai",
              title: "Top Engineering Colleges in Mumbai",
            },
            {
              id: 196,
              href: "/universities-list/engineering?cityParam=pune",
              title: "Top Engineering Colleges in Pune",
            },
            {
              id: 197,
              href: "/universities-list/engineering?cityParam=delhi",
              title: "Top Engineering Colleges in Delhi",
            },
            {
              id: 198,
              href: "/universities-list/engineering?cityParam=chennai",
              title: "Top Engineering Colleges in Chennai",
            },
            {
              id: 199,
              href: "/universities-list/engineering?cityParam=kolkata",
              title: "Top Engineering Colleges in Kolkata",
            },
            {
              id: 200,
              href: "/universities-list/engineering?cityParam=bangalore",
              title: "Top Engineering Colleges in Bangalore",
            },
            {
              id: 201,
              href: "/universities-list/engineering?cityParam=hyderabad",
              title: "Top Engineering Colleges in Hyderabad",
            },
          ],
        },
      ],
    },

    {
      id: 204,
      title: "All Colleges",
      href: "/universities-list/all",
    },
    // {
    //   id: 205,
    //   title: "Top Courses",
    //   href: "/course-list",
    // },
    {
      id: 207,
      title: "Entrance Exams",
      href: "/exams",
    },
    {
      id: 208,
      title: "Articles",
      href: "/articles",
    },
    {
      id: 209,
      title: "News",
      href: "/news",
    },
  ],
};
