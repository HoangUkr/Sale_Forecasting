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
    createHistogram: function () {
        const labels = [
            'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
        ];
        var data = {
            labels: labels,
            datasets: [
                {
                    label: 'Daily Sale',
                    data: [10, 20, 30, 40, 50, 60, 70],
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
    createPlotline: function () {
        const labels = [
            'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
        ];
        const data = {
            labels: labels,
            datasets: [{
                label: 'Sale Growth',
                data: [65, 59, 80, 81, 56, 55, 40],
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
    createDoughnutChart: function () {
        const data = {
            labels: [
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        };
        const config = {
            type: 'doughnut',
            data: data,
        };
        const ctx = document.getElementById('dishDistributionDoughnut').getContext('2d');
        const doughnut = new Chart(ctx, config);
    },

    // Create plotline for comparison
    createPlotlineComparison: function () {
    },
};