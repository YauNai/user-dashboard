import Chart from 'chart.js/auto'

export function makeChart(element, type = 'bar', labels = [], label = '', data = []) {

  let bgColors = []
  for (let i = 0; i < data.length; i++) {
    const step = 40 / data.length
    const lightness = 70 - step * i
    const color = `hsla(32, 100%, ${lightness}%, 50%)`
    bgColors.push(color)
  }

  return new Chart(element, {
    type,
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          fill: false,
          tension: 0.1,
          borderColor: bgColors,
          backgroundColor: bgColors,
        },
      ],
    },
    options: {
      maintainAspectRatio: false
    }
  })
}
