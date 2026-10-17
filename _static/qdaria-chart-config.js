/**
 * QDaria Chart Configuration Enhancement
 * Ensures all Plotly charts use full width and optimal heights
 * Dynamically updates chart colors based on theme (dark/light mode)
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Define color schemes for dark and light modes
    const colorSchemes = {
        dark: {
            text: '#f0f0f0',
            gridColor: '#444444',
            backgroundColor: 'transparent',
            axisColor: '#e0e0e0',
            annotationColor: '#ffffff',
            titleColor: '#ffffff',
            legendColor: '#e0e0e0'
        },
        light: {
            text: '#333333',
            gridColor: '#e0e0e0',
            backgroundColor: 'transparent',
            axisColor: '#444444',
            annotationColor: '#333333',
            titleColor: '#333333',
            legendColor: '#444444'
        }
    };

    // Chart IDs to monitor for theme updates
    const chartIds = [
        'marketGrowthChart',
        'marketSegmentationChart',
        'competitorFundingChart',
        'productPortfolioMatrix',
        'techStackArchitecture',
        'techStackFlow',
        'organizationalChart',
        'executionRoadmapChart',
        'fundingAllocationChart',
        'financialProjectionsChart',
        'revenueStreamChart',
        'riskAssessmentMatrix'
    ];

    /**
     * Detect current theme (dark or light mode)
     */
    function detectTheme() {
        // Check for data-theme attribute
        const htmlTheme = document.documentElement.getAttribute('data-theme');
        if (htmlTheme) {
            return htmlTheme === 'dark' ? 'dark' : 'light';
        }

        // Check for class-based theme
        if (document.documentElement.classList.contains('dark') || 
            document.body.classList.contains('dark') ||
            document.documentElement.classList.contains('theme-dark') ||
            document.body.classList.contains('theme-dark')) {
            return 'dark';
        }

        // Check CSS media query
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        // Check computed background color
        const bgColor = window.getComputedStyle(document.body).backgroundColor;
        const rgb = bgColor.match(/\d+/g);
        if (rgb) {
            const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
            return brightness < 128 ? 'dark' : 'light';
        }

        return 'light';
    }

    // Configuration for all charts
    const chartConfig = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
        toImageButtonOptions: {
            format: 'png',
            filename: 'qdaria-chart',
            width: 1920,
            height: 1080,
            scale: 2
        }
    };

    // Get layout defaults based on current theme
    function getLayoutDefaults() {
        const theme = detectTheme();
        const colors = colorSchemes[theme];
        
        return {
            autosize: true,
            margin: {
                l: 80,
                r: 80,
                t: 100,
                b: 80,
                pad: 10
            },
            font: {
                family: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                size: 14,
                color: colors.text
            },
            title: {
                font: { color: colors.titleColor }
            },
            xaxis: {
                color: colors.axisColor,
                gridcolor: colors.gridColor,
                tickfont: { color: colors.text },
                titlefont: { color: colors.axisColor }
            },
            yaxis: {
                color: colors.axisColor,
                gridcolor: colors.gridColor,
                tickfont: { color: colors.text },
                titlefont: { color: colors.axisColor }
            },
            legend: {
                font: { color: colors.legendColor }
            },
            paper_bgcolor: colors.backgroundColor,
            plot_bgcolor: colors.backgroundColor,
            hoverlabel: {
                bgcolor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                bordercolor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                font: {
                    family: 'system-ui, -apple-system, sans-serif',
                    size: 14,
                    color: theme === 'dark' ? 'white' : 'black'
                }
            }
        };
    }

    /**
     * Update Plotly chart layout for theme
     */
    function updateChartTheme(chartId) {
        const chartDiv = document.getElementById(chartId);
        if (!chartDiv || !chartDiv._fullLayout) return;

        const theme = detectTheme();
        const colors = colorSchemes[theme];
        const updateLayout = {
            font: { color: colors.text },
            title: { font: { color: colors.titleColor } },
            xaxis: {
                color: colors.axisColor,
                gridcolor: colors.gridColor,
                tickfont: { color: colors.text },
                titlefont: { color: colors.axisColor }
            },
            yaxis: {
                color: colors.axisColor,
                gridcolor: colors.gridColor,
                tickfont: { color: colors.text },
                titlefont: { color: colors.axisColor }
            },
            legend: {
                font: { color: colors.legendColor }
            },
            paper_bgcolor: colors.backgroundColor,
            plot_bgcolor: colors.backgroundColor,
            hoverlabel: {
                bgcolor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                bordercolor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                font: {
                    color: theme === 'dark' ? 'white' : 'black'
                }
            }
        };

        // Handle multiple axes
        for (let i = 2; i <= 10; i++) {
            if (chartDiv._fullLayout[`xaxis${i}`]) {
                updateLayout[`xaxis${i}`] = {
                    color: colors.axisColor,
                    gridcolor: colors.gridColor,
                    tickfont: { color: colors.text },
                    titlefont: { color: colors.axisColor }
                };
            }
            if (chartDiv._fullLayout[`yaxis${i}`]) {
                updateLayout[`yaxis${i}`] = {
                    color: colors.axisColor,
                    gridcolor: colors.gridColor,
                    tickfont: { color: colors.text },
                    titlefont: { color: colors.axisColor }
                };
            }
        }

        // Update annotations
        if (chartDiv._fullLayout.annotations) {
            updateLayout.annotations = chartDiv._fullLayout.annotations.map(ann => ({
                ...ann,
                font: { ...ann.font, color: colors.annotationColor }
            }));
        }

        // Apply the update
        Plotly.relayout(chartId, updateLayout);
    }

    /**
     * Update all monitored charts based on current theme
     */
    function updateAllChartThemes() {
        chartIds.forEach(chartId => {
            updateChartTheme(chartId);
        });
        
        // Also update any other Plotly charts found
        const allPlotlyCharts = document.querySelectorAll('.js-plotly-plot');
        allPlotlyCharts.forEach(chart => {
            if (chart.id && chart._fullLayout) {
                updateChartTheme(chart.id);
            }
        });
    }

    // Function to enhance existing Plotly plots
    function enhancePlotlyCharts() {
        // Find all Plotly chart containers
        const chartContainers = document.querySelectorAll('.js-plotly-plot, [id*="Chart"], .chart-placeholder');
        
        chartContainers.forEach(container => {
            // Check if it's a Plotly plot
            if (container._fullLayout) {
                // Update layout to ensure full width and apply theme
                const layoutDefaults = getLayoutDefaults();
                Plotly.relayout(container, {
                    ...layoutDefaults,
                    width: null,  // Let it auto-size
                    height: null  // Let CSS control height
                });
                
                // Force resize to fit container
                Plotly.Plots.resize(container);
            }
        });
        
        // Also update theme for all monitored charts
        updateAllChartThemes();
    }

    // Run enhancement after a delay to ensure Plotly charts are rendered
    setTimeout(enhancePlotlyCharts, 1000);
    
    // Also run on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const plots = document.querySelectorAll('.js-plotly-plot');
            plots.forEach(plot => {
                if (plot._fullLayout) {
                    Plotly.Plots.resize(plot);
                }
            });
        }, 250);
    });

    // Monitor for theme changes
    function setupThemeMonitoring() {
        const observer = new MutationObserver(() => {
            updateAllChartThemes();
        });

        // Observe theme changes on html and body
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme', 'class']
        });
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Listen for media query changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                updateAllChartThemes();
            });
        }
    }

    // Setup theme monitoring
    setupThemeMonitoring();

    // Monkey patch Plotly.newPlot to automatically apply our config
    const originalNewPlot = window.Plotly ? window.Plotly.newPlot : null;
    if (originalNewPlot) {
        window.Plotly.newPlot = function(gd, data, layout, config) {
            // Get current theme-aware defaults
            const layoutDefaults = getLayoutDefaults();
            
            // Merge our defaults with provided layout
            const enhancedLayout = {
                ...layoutDefaults,
                ...layout,
                autosize: true,
                width: null,
                height: null
            };
            
            // Merge our config with provided config
            const enhancedConfig = {
                ...chartConfig,
                ...config
            };
            
            // Call original function with enhanced parameters
            return originalNewPlot.call(this, gd, data, enhancedLayout, enhancedConfig).then(function() {
                // Force a resize after creation
                setTimeout(() => {
                    Plotly.Plots.resize(gd);
                    // Apply theme if it has an ID
                    if (gd.id) {
                        updateChartTheme(gd.id);
                    }
                }, 100);
                return gd;
            });
        };
    }
});

// Utility function to manually fix a specific chart
window.fixChartWidth = function(chartId) {
    const chart = document.getElementById(chartId);
    if (chart && chart._fullLayout) {
        Plotly.relayout(chart, {
            autosize: true,
            width: null,
            height: null
        });
        Plotly.Plots.resize(chart);
    }
};

// Export functions and data to window for external access
window.PlotlyChartConfig = {
    detectTheme: detectTheme,
    colorSchemes: colorSchemes,
    updateChartTheme: updateChartTheme,
    updateAllChartThemes: updateAllChartThemes
};

// Utility function to manually update theme for a specific chart
window.updateChartTheme = function(chartId) {
    const chartDiv = document.getElementById(chartId);
    if (!chartDiv || !chartDiv._fullLayout) return;

    const theme = window.PlotlyChartConfig.detectTheme();
    const colors = window.PlotlyChartConfig.colorSchemes[theme];
    const updateLayout = {
        font: { color: colors.text },
        title: { font: { color: colors.titleColor } },
        xaxis: {
            color: colors.axisColor,
            gridcolor: colors.gridColor,
            tickfont: { color: colors.text },
            titlefont: { color: colors.axisColor }
        },
        yaxis: {
            color: colors.axisColor,
            gridcolor: colors.gridColor,
            tickfont: { color: colors.text },
            titlefont: { color: colors.axisColor }
        },
        legend: {
            font: { color: colors.legendColor }
        },
        paper_bgcolor: colors.backgroundColor,
        plot_bgcolor: colors.backgroundColor
    };

    Plotly.relayout(chartId, updateLayout);
};

// Utility function to update all chart themes
window.updateAllPlotlyThemes = function() {
    const allCharts = document.querySelectorAll('.js-plotly-plot, [id*="Chart"]');
    allCharts.forEach(chart => {
        if (chart.id && chart._fullLayout) {
            window.updateChartTheme(chart.id);
        }
    });
};