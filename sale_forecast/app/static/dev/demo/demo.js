demo = {
  initPickColor: function() {
    $('.pick-class-label').click(function() {
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

  initDocChart: function() {
    chartColor = "#FFFFFF";

    ctx = document.getElementById('chartHours').getContext("2d");

    myChart = new Chart(ctx, {
      type: 'line',

      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        datasets: [{
            borderColor: "#6bd098",
            backgroundColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
          },
          {
            borderColor: "#f17e5d",
            backgroundColor: "#f17e5d",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
          },
          {
            borderColor: "#fcc468",
            backgroundColor: "#fcc468",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });

  },
  //=========== MY CUSTOM JS CODE ===================//
  // Main function of data visualization
  dataVisualization: function(){
    // Each weekday sale visualization
    createHistogram();
    // Merge the data from last 7 days in dataset and the new upload data
    createPlotline();

    // Pie chart of sale each dish
    createPieChart();

    // Compare the last prediction with actual data
    createPlotlineComparison();

    // Visualize prediction next 7 days
    createHistogram();
  },

  // Create histogram
  createHistogram: function(){
    const labels = [
      'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    ];
    var data = {
      labels: labels,
      datasets: [
        {
          label: 'Daily Sale',
          data: [10, 20, 30, 40, 50 ,60, 70],
          backgroundColor: '#F17E5D',
          borderColor: '#F17E5D',
          borderWidth: 1,
          hoverBackgroundColor: '#c0644a'
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
  createPlotline: function(){

  },

  // Create pie chart
  createPieChart: function(){

  },

  // Create plotline for comparison
  createPlotlineComparison: function(){
  },
};