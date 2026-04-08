import { Construction } from "lucide-react";

// src/locales/pashto.js
const pashto = {
    amis: "د هوایي ډګرونو د مدیریت سیستم",

    dari: "دري",
    pashto: "پښتو",

    login: {
        email: "برېښنالیک",
        enterEmail: "خپل برېښنالیک دلته دننه کړئ",
        password: "پټنوم",
        enterPassword: "خپل پټنوم دننه کړئ",
        rememberMe: "ما په یاد وساته",
        forgotPassword: "پټنوم مو هېر کړی؟",
        enter: "سیستم ته ننوتل",
    },

    common: {
        dashboard: "ډشبورډ",
        loading: "مهرباني وکړئ لږ صبر وکړئ...",
        name: "نوم",
        namePashto: "نوم (پښتو)",
        nameDari: "نوم (دري)",
        nameEnglish: "نوم (انګلیسي)",
        province: "ولایت",
        district: "ولسوالي",
        selectProvince: "ولایت وټاکئ",
        selectDistrict: "ولسوالي وټاکئ",
        action: "عملیات",

        NO: "شمیره",
        date: "نېټه",
        time: "وخت",
        edit: "سمول",
        editInfo: "معلومات سمول",
        updating: "د معلوماتو تازه کول...",
        saveChanges: "بدلونونه خوندي کول",
        add: "اضافه کول",
        storInfo: "معلومات ثبتول",
        storingInfo: "معلومات خوندي کېږي...",
        next: "وروستنی",
        previous: "مخکینی",
        descriptions: "تشریحات",
        search: "لټون",
        searching: "لټون روان دی...",
        delete: "حذف",
        clear: "پاکول",
        goBack: "شاته تګ",
        type: "ډول",
        image: "انځور",
        log: "لاګ",
        profile: "پروفایل",
        isBlocked: "آیا بند شوی",
        inoformationtStoredSuccessfully: "معلومات په بریالیتوب سره ثبت شول",
        inoformationtUpdatedSuccessfully: "معلومات په بریالیتوب سره بدل شول",
    },

    input: {
        enterName: "نوم دننه کړئ",
        enterUserEmail: "د کارونکي ایمیل دننه کړئ",
        enterUserPassword: "پټنوم دننه کړئ",
        enterPasswordConfirmation: "د پټنوم تایید دننه کړئ",
        enterPositionTitle: "د دندې سرلیک دننه کړئ",
        enterRoleName: "د صلاحیت نوم دلته دننه کړئ",

        selectRole: "صلاحیت وټاکئ",
        selectAirport: "هوایي ډګر وټاکئ",
        selectGeneralBranch: "عمومي څانګه وټاکئ",
        selectFile: "فایل وټاکئ",
        selectActivityState: "د فعالیت حالت وټاکئ",
    },

    error: {
        general:
            "یو څه غلط شول! مهرباني وکړئ معلومات وګورئ، یا له ادمین سره اړیکه ونیسئ.",

        credentialInvalid: "برېښنالیک یا پټنوم ناسم دی",

        nameIsNeeded: "نوم اړین دی",
        emailIsNeeded: "برېښنالیک اړین دی",
        emailIsInvalid: "برېښنالیک سم نه دی",
        emailAlreadyExists: "دا برېښنالیک مخکې ثبت شوی",

        passwordTooShort: "پټنوم ډېر لنډ دی",
        passwordNotMatch: "پټنوم سره برابر نه دی",
        passwordInvalid: "پټنوم ناسم دی",

        roleIsNeeded: "صلاحیت ټاکل اړین دی",
        roleInvalid: "صلاحیت ناسم دی",
        roleNotFound: "صلاحیت ونه موندل شو",

        nameAlreadyExists: "دا نوم مخکې ثبت شوی",
        permissionIsNeeded: "اجازې ټاکل اړین دي",
        permissionBeList: "اجازې باید یو باوري لیست وي.",

        airportIsNeeded: "هوایي ډګر ټاکل اړین دی",
        airportInvalid: "هوایي ډګر ناسم دی",
        generalDepartmentInvalid: "عمومي څانګه ناسمه دی",
        positionTitleIsNeeded: "د دندې سرلیک اړین دی",

        passwordIsNeeded: "مهرباني وکړئ پټنوم داخل کړئ.",
        passwordInvalid: "اوسنی پټنوم ناسم دی.",
        confirmPasswordInvalid: "د پټنوم تایید سم نه دی.",
        passwordMin: "پټنوم باید لږ تر لږه ۸ توري ولري.",

        passwordLetters: "پټنوم باید لږ تر لږه یو حرف ولري.",
        passwordMixedCase: "پټنوم باید لوی او کوچني حروف ولري.",
        passwordNumbers: "پټنوم باید لږ تر لږه یو عدد ولري.",
        passwordSymbols: "پټنوم باید لږ تر لږه یو ځانګړی نښه ولري.",
    },

    state: {
        approve: "منل",
        disApprove: "ردول",

        active: "فعال",
        blocked: "بند شوی",
        notBlocked: "ندی بند شوی",
        approved: "منل شوی",
        notApproved: "ندی منل شوی ",
        disApproved: "رد شوی",
        deActive: "غیرفعال",
        expired: "موده پای ته رسېدلې",

        activityStatus: "فعالیت حالت",
        approvalStatus: "د تایید حالت",
    },

    measurement: {
        area: "ساحه",
        meter: "متر",
        kilometer: "کیلومتر",
        squareMeter: "مربع متر",
        hectare: "هکتار",
        kilogram: "کیلوګرام",
        gram: "ګرام",
        liter: "لیتر",
        ton: "ټن",
        foot: "فټ",
        mile: "مایل",
    },

    airport: {
        airportList: "د هواي ډګرونو لیست",
        airport: "هوایي ډګر",
        airports: "هوایي ډګرونه",
        addNewAirport: "نوی هوایي ډګر اضافه کړئ",
        addingNewAirport: "د نوي هوایي دګر اضافه کول",
        airportInfo: "د هوایي ډګر معلومات",
        airportCode: "د هوایي ډګر کوډ",
        runwayLength: "د رنوې اوږدوالی",
        runwayWidth: "د رنوې پلنوالی",
        airportType: " هوایي ډګر ډول",
        aircraftTypes: "د الوتکو ډولونه",

        type: {
            international: "نړیوال",
            domestic: "کورنی",
            military: "پوځي",
            cargo: "باربري",
            regional: "سیمه‌ییز",
            private: "شخصي",
        },
    },
    airline: {
        airlineList: "د هوايي شرکتونو لیست",
        airline: "هوايي شرکت",
        airlines: "هوايي شرکتونه",
        addNewAirline: "نوی هوايي شرکت اضافه کړئ",
        addingNewAirline: "د نوي هوايي شرکت اضافه کول",
        airlineInfo: "د هوايي شرکت معلومات",
        airlineCode: "د هوايي شرکت کوډ",
        airlineType: "د هوايي شرکت ډول",
    },


    flight: {
        flight: "الوتنه",
        flights: "الوتنې",
        flightNumber: "د الوتنې نمبر",
        airline: "هوايي شرکت",
        departure: "روانېدل",
        arrival: "رسېدل",
        departureTime: "د روانېدو وخت",
        arrivalTime: "د رسېدو وخت",
        origin: "مبدا",
        destination: "مقصد",
        flyteServices: "د الوتنو چوپړتیاوې",
    },

    sgha: {
        SGHAPart: "د SGHA برخه",
        sghaServiceUnite: "د SGHA خدماتي واحد",
        sghaServices: "د SGHA خدمات",
    },

    passenger: {
        passenger: "مسافر",
        passengers: "مسافرین",
        passportNumber: "د پاسپورټ نمبر",
        nationality: "تابعیت",
        gender: "جنس",
        male: "نارینه",
        female: "ښځینه",
    },

    airline: {
        airline: "هوايي شرکت",
        airlines: "هوايي شرکتونه",
        airlineName: "د هوايي شرکت نوم",
        country: "هیواد",
    },

    report: {
        reports: "راپورونه",
        dailyReport: "ورځنی راپور",
        monthlyReport: "میاشتنی راپور",
        yearlyReport: "کلنی راپور",
        generateReport: "راپور جوړول",
    },

    user: {
        list: "د کاروونکو لیست",
        users: "کاروونکي",
        addUser: "نوی کاروونکی اضافه کړئ",
        username: "کارن نوم",
        email: "برېښنالیک",
        password: "پټنوم",
        role: "صلاحیت",
        roles: "صلاحیتونه",
        addNewRole: "د نوي صلاحیت زیاتول",

        permissions: "اجازې",
        permissionsList: "د اجازو لیست",
        searchByRoleName: "د صلاحیت په نوم سره لټون وکړئ",
        positionTitle: "د بست عنوان",
        generalDepartment: "عمومي څانګه",

        confirmPassword: "د پټ نوم تایید",
        addingNewUser: "د نوي کاروونکي زیاتول",
        reset: "بیا تنظیمول",

        currentPassword: "اوسنی پټ نوم",
        newPassword: "نوی پټ نوم",
        logout:"له سیستم څخه وتل",
        loggingOut:"له سیستم څخه د وتلو په حال کې",
    },

    construction: {
        constructionsPart: "د ودانیو برخه",
        airportConstructions: "د هوايي ډګر ودانۍ",
        constructions: "ودانۍ",
        constructionTypes: "د ودانیو د جوړښت ډولونه",
    },
};

export default pashto;
