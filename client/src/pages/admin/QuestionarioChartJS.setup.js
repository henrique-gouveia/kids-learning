// Pie chart
// -----------------------------------

export const Pie = {
    data: {
        labels: ['% Acertos', '% Erros'],
        datasets: [{
            data: [0, 0],
            backgroundColor: ['#37bc9b', '#f05050'],
            hoverBackgroundColor: ['#37bc9b', '#f05050']
        }]
    },
    options: {
        legend: {
            display: false
        }
    }
}

// Radar chart
// -----------------------------------
export const Radar = {
    data: {
        labels: ['Vocabulário', 'Leitura', 'Audição'],
        datasets: [{
            label: '% Acertos',
            backgroundColor: 'rgba(55, 188, 155, 0.2)',
            borderColor: 'rgba(55, 188, 155, 1)',
            data: [0, 0, 0]
        }, {
            label: '% Erros',
            backgroundColor: 'rgba(240, 80, 80, 0.2)',
            borderColor: 'rgba(240, 80, 80, 1)',
            data: [0, 0, 0]
        }]
    },
    options: {
        legend: {
            display: false
        }
    }
}
