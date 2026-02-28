const localDate = {
    name: "localDate",
    months: [
      ["حمل", "حمل"],
      ["ثور", "ثور"],
      ["جوزا", "جوزا"],
      ["سرطان", "سرطان"],
      ["اسد", "اسد"],
      ["سنبله", "سنبله"],
      ["میزان", "میزان"],
      ["عقرب", "عقرب"],
      ["قوس", "قوس"],
      ["جدی", "جدی"],
      ["دلو", "دلو"],
      ["حوت", "حوت"],
    ],
    weekDays: [
      ["شنبه", "شن"],
      ["یک شنبه", "یک"],
      ["دوشنبه", "دو"],
      ["سه شنبه", "سه"],
      ["چهار شنبه", "چه"],
      ["پنج شنبه", "پن"],
      ["جمعه", "جم"],
    ],
    digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    meridiems: [
      ["قبل از ظهر", "AM"],
      ["بعد از ظهر", "PM"]
    ]
    ,
  };
  
  export default localDate

  export const localDateStyle = {
    width: '100%',
    boxSizing: 'border-box',
    height: '48px',
    zIndex: 999,
    border: '1px solid #eaeaea',
    padding: '12 12px',
    fontSize: '18px'
};

export const localDateContainerStyle = {
    width: '100%',
    fontSize: '18px'
};