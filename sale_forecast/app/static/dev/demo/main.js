demo = {
    initPickColor: function () {
        $('.pick-class-label').click(function () {
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if (display_div.length) {
                var display_buttons = display_div.find('.btn');
                display_buttons.removeClass(old_class);
                display_buttons.addClass(new_class);
                display_div.attr('data-class', new_class);
            }
        });
    },
    //=========== MY CUSTOM JS CODE ===================//
    // Main function of data visualization
    dataVisualization: function () {
        // Each weekday sale visualization
        createHistogram();
        // Merge the data from last 7 days in dataset and the new upload data
        createPlotline();

        // Pie chart of sale each dish
        createDoughnutChart();

        // Compare the last prediction with actual data
        createPlotlineComparison();

        // Visualize prediction next 7 days
        createHistogram();
    },

    // Create histogram
    createHistogram: function (labels, data) {
        var data = {
            labels: labels,
            datasets: [
                {
                    label: 'Daily Sale',
                    data: data,
                    backgroundColor: '#F17E5D',
                    borderColor: '#F17E5D',
                    borderWidth: 1,
                    hoverBackgroundColor: '#c0644a',
                    hoverBorderColor: '#c0644a'
                }
            ]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                plugins: {
                    tooltip: {
                        enabled: true
                    }
                }
            }
        };

        const ctx = document.getElementById('histogramWeekday').getContext('2d');
        const histogram = new Chart(ctx, config);
    },

    // Create plot line
    createPlotline: function (labels, data) {
        // debugger;
        var data = {
            labels: labels,
            datasets: [{
                label: 'Sale Growth',
                data: data,
                fill: false,
                borderColor: '#F17E5D',
                tension: 0.1
            }]
        };
        const config = {
            type: 'line',
            data: data,
        };
        const ctx = document.getElementById('saleGrowthLine').getContext('2d');
        const plotline = new Chart(ctx, config);
    },

    // Create pie chart
    createDoughnutChart: function (labels, data) {
        debugger;
        if (labels.length > 0) {
            let colors = [];
            for (let i = 0; i < labels.length; i++) {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                colors.push(`rgb(${r}, ${g}, ${b})`);
            }
            debugger;
            var data = {
                labels: labels,
                datasets: [{
                    label: 'Dish Distribution',
                    data: data,
                    backgroundColor: colors,
                    hoverOffset: 4
                }]
            };
            const config = {
                type: 'doughnut',
                data: data,
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const label = context.label || '';
                                    const value = context.parsed;
                                    return `${label}: ${value}`;
                                }
                            }
                        },
                        legend: {
                            position: 'right'
                        }
                    },
                    responsive: true
                }
            };
            const ctx = document.getElementById('dishDistributionDoughnut').getContext('2d');
            const doughnut = new Chart(ctx, config);
        }
    },

    // Create plotline for comparison
    createPlotlineComparison: function () {
        const labels = [
            'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
        ];
        const dataset_1 = {
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            // borderColor: '#F17E5D',
            tension: 0.1,
            borderColor: '#51CACF',
            backgroundColor: 'transparent',
            pointBorderColor: '#51CACF',
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8
        };
        const dataset_2 = {
            data: [50, 45, 72, 79, 64, 52, 36],
            fill: false,
            // borderColor: '#F17E5D',
            tension: 0.1,
            borderColor: '#fbc658',
            backgroundColor: 'transparent',
            pointBorderColor: '#fbc658',
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
        };
        const data = {
            labels: labels,
            datasets: [dataset_1, dataset_2]
        };
        const config = {
            type: 'line',
            data: data,
        };
        const ctx = document.getElementById('predictionCompPlot').getContext('2d');
        const plotline = new Chart(ctx, config);
    },
};