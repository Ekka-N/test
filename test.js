const inv = [
    {
    "customer": "MDT",
    "performance": [
      {
      "playId": "Гамлет",
      "audience": 55,
      "type": "tragedy"
      },
      {
      "playId": "Ромео и Джульетта",
      "audience": 35,
      "type": "tragedy"
      },
      {
      "playId": "Отелло",
      "audience": 40,
      "type": "comedy"
      }
   ]
}]


const countThisAmount = performance => {
    let thisAmount = 0;
    
    switch (performance.type) {
        case "tragedy":
        thisAmount = 40000;
        if (performance.audience > 30) {
            thisAmount += 1000 * (performance.audience - 30);
        }
        break;
        case "comedy":
        thisAmount = 30000;
        if (performance.audience > 20) {
            thisAmount += 10000 + 500 * (performance.audience - 20);
        }
        thisAmount += 300 * performance.audience;
        break;
        default:
        throw new Error(`неизвестный тип: ${performance.type}`);
    };

    return thisAmount;
};

const statement = invoice => {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Счет для ${invoice[0].customer}\n`;
    
    const format = new Intl.NumberFormat("ru-RU",
                { style: "currency", currency: "RUB",
                minimumFractionDigits: 2 }).format;
    
    invoice[0].performance.forEach( perf => {
        const play = perf.playId;         
    
        // Добавление бонусов
        volumeCredits += Math.max(perf.audience - 30, 0);
        
        // Дополнительный бонус за каждые 10 комедий
        if ("comedy" === perf.type) volumeCredits += Math.floor(perf.audience / 5);
        
        // Вывод строки счета
        result += `${play}: ${format(countThisAmount(perf) / 100)}`;
        result += ` (${perf.audience} мест)\n`;
        totalAmount += countThisAmount(perf);
    });

    result += `Итого с вас ${format(totalAmount/100)}\n`;
    result += `Вы заработали ${volumeCredits} бонусов\n`;
    return result;
};