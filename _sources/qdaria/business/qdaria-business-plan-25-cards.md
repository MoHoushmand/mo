---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---
# QDaria Business Plan - Premium Chart Card Implementation

```{include} _chart_assets.md
```

This file demonstrates how to apply the premium chart cards to specific charts from the business plan.

## Example: Market Growth Chart with Premium Card

Here's how the market growth chart looks with the premium card wrapper:

```{card} 📈 **Quantum Computing Market Growth Projection (2020-2035)**
:class-card: qdaria-chart-card primary full-width
:class-header: sd-card-header
:class-body: sd-card-body

<div id="marketGrowthChart" class="chart-placeholder"></div>

<script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Market Growth Chart with Professional Features
    var years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];
    
    // Optimistic scenario - exponential growth
    var optimistic = [0.5, 0.7, 1.0, 1.2, 1.3, 2.5, 5.0, 10.0, 25.0, 60.0, 150.0, 350.0, 650.0, 950.0, 1200.0, 1500.0];
    
    // Neutral/Base case scenario
    var neutral = [0.5, 0.7, 1.0, 1.2, 1.3, 2.0, 3.5, 6.0, 12.0, 25.0, 50.0, 100.0, 250.0, 500.0, 850.0, 1300.0];
    
    // Pessimistic scenario - slower adoption
    var pessimistic = [0.5, 0.7, 1.0, 1.2, 1.3, 1.5, 2.0, 3.0, 4.5, 7.0, 12.0, 20.0, 35.0, 60.0, 100.0, 180.0];
    
    // QDaria's projected market capture
    var qdariaShare = years.map((year, i) => {
        if (year < 2025) return 0;
        if (year === 2025) return 0.001;
        if (year === 2026) return 0.005;
        if (year === 2027) return 0.05;
        if (year === 2028) return 0.2;
        if (year === 2029) return 0.5;
        if (year === 2030) return 1.0;
        return neutral[i] * 0.001; // 0.1% market share post-2030
    });
    
    var data = [
        {
            x: years,
            y: neutral,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Base Case',
            line: {color: '#00CED1', width: 3},
            marker: {size: 8}
        },
        {
            x: years,
            y: optimistic,
            type: 'scatter',
            mode: 'lines',
            name: 'Optimistic',
            line: {color: '#20B2AA', width: 2, dash: 'dash'}
        },
        {
            x: years,
            y: pessimistic,
            type: 'scatter',
            mode: 'lines',
            name: 'Conservative',
            line: {color: '#4682B4', width: 2, dash: 'dot'}
        },
        {
            x: years.slice(5),
            y: qdariaShare.slice(5),
            type: 'bar',
            name: 'QDaria Revenue',
            marker: {color: '#FF6347'},
            yaxis: 'y2'
        }
    ];
    
    var layout = {
        title: {
            text: 'Quantum Computing Market Evolution & QDaria Growth',
            font: {size: 24}
        },
        xaxis: {
            title: 'Year',
            showgrid: true,
            gridcolor: '#E0E0E0'
        },
        yaxis: {
            title: 'Market Size ($ Billions)',
            showgrid: true,
            gridcolor: '#E0E0E0',
            rangemode: 'tozero'
        },
        yaxis2: {
            title: 'QDaria Revenue ($ Billions)',
            overlaying: 'y',
            side: 'right',
            rangemode: 'tozero'
        },
        legend: {
            x: 0.02,
            y: 0.98,
            bgcolor: 'rgba(255,255,255,0.8)',
            borderwidth: 1
        },
        hovermode: 'x unified',
        plot_bgcolor: '#FAFAFA',
        paper_bgcolor: 'white'
    };
    
    var config = {
        responsive: true,
        displayModeBar: true,
        modeBarButtonsToAdd: ['downloadSVG'],
        modeBarButtonsToRemove: ['pan2d', 'lasso2d']
    };
    
    Plotly.newPlot('marketGrowthChart', data, layout, config);
});
</script>

+++
<div class="chart-description">
<span class="insight-badge">💡 Key Insight</span>
<span class="insight-badge">🚀 CAGR: 45%+</span>
The quantum computing market is entering a period of explosive growth, with projections 
ranging from $180B to $1.5T by 2035. QDaria's strategic entry in 2025 positions us to 
capture significant value as the market transitions from research to commercial applications. 
Our unique topological approach addresses the fundamental challenge of error correction, 
potentially accelerating the timeline to fault-tolerant quantum computing.
</div>
```

## Example: Competitor Funding Analysis with Interactive Controls

```{card} 💰 **Quantum Computing Competitive Landscape**
:class-card: qdaria-chart-card secondary
:class-header: sd-card-header
:class-body: sd-card-body

<div class="chart-controls">
    <button class="active" onclick="updateCompetitorChart('all')">All Companies</button>
    <button onclick="updateCompetitorChart('hardware')">Hardware Focus</button>
    <button onclick="updateCompetitorChart('software')">Software Focus</button>
    <button onclick="updateCompetitorChart('fullstack')">Full Stack</button>
</div>

<div id="competitorFundingChart" class="chart-placeholder"></div>

<script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
<script>
// Store all competitor data
const competitorData = {
    all: {
        companies: ['IBM Quantum', 'Google Quantum AI', 'Rigetti', 'IonQ', 'Xanadu', 'D-Wave', 
                   'Quantinuum', 'PsiQuantum', 'Atom Computing', 'Pasqal', 'Horizon Quantum', 
                   'Classiq', 'Q-CTRL', 'ColdQuanta', 'QDaria'],
        funding: [5000, 4500, 300, 650, 250, 300, 425, 665, 215, 140, 75, 63, 70, 110, 12],
        type: ['Full Stack', 'Full Stack', 'Full Stack', 'Hardware', 'Hardware', 'Hardware',
               'Full Stack', 'Hardware', 'Hardware', 'Hardware', 'Software', 'Software', 
               'Software', 'Hardware', 'Full Stack']
    }
};

function updateCompetitorChart(filter) {
    // Update button states
    document.querySelectorAll('.chart-controls button').forEach(btn => {
        btn.classList.remove('active');
    });
    // Called from the buttons and once on page load, so there is no click event to read.
    const activeButton = document.querySelector(`.chart-controls button[onclick*="'${filter}'"]`);
    if (activeButton) activeButton.classList.add('active');
    
    // Filter data based on selection
    let filteredCompanies = [];
    let filteredFunding = [];
    
    if (filter === 'all') {
        filteredCompanies = competitorData.all.companies;
        filteredFunding = competitorData.all.funding;
    } else {
        competitorData.all.companies.forEach((company, index) => {
            const companyType = competitorData.all.type[index].toLowerCase().replace(' ', '');
            if (filter === 'fullstack' && companyType === 'fullstack' ||
                filter === 'hardware' && companyType === 'hardware' ||
                filter === 'software' && companyType === 'software') {
                filteredCompanies.push(company);
                filteredFunding.push(competitorData.all.funding[index]);
            }
        });
    }
    
    // Update chart
    var data = [{
        x: filteredCompanies,
        y: filteredFunding,
        type: 'bar',
        marker: {
            color: filteredCompanies.map(company => 
                company === 'QDaria' ? '#FF6347' : '#4169E1'
            ),
            line: {
                color: 'rgba(0,0,0,0.1)',
                width: 1
            }
        },
        text: filteredFunding.map(val => '$' + val + 'M'),
        textposition: 'outside'
    }];
    
    var layout = {
        title: {
            text: 'Funding Comparison - ' + filter.charAt(0).toUpperCase() + filter.slice(1),
            font: {size: 20}
        },
        xaxis: {
            title: 'Company',
            tickangle: -45
        },
        yaxis: {
            title: 'Total Funding ($ Millions)',
            rangemode: 'tozero'
        },
        plot_bgcolor: '#FAFAFA',
        bargap: 0.2
    };
    
    Plotly.newPlot('competitorFundingChart', data, layout, {responsive: true});
}

// Initial chart load
document.addEventListener('DOMContentLoaded', function() {
    updateCompetitorChart('all');
});
</script>

+++
<div class="chart-description">
<span class="insight-badge">🎯 Strategic Position</span>
<span class="insight-badge">💎 Differentiation: Topological QC</span>
While tech giants have invested billions in quantum computing, QDaria's focused approach 
on topological quantum computing using Fibonacci anyons represents a fundamentally different 
path to fault tolerance. Our $12M seed round, though modest compared to competitors, is 
strategically allocated to achieve specific breakthroughs that larger companies are not pursuing.
</div>
```

## Example: Financial Projections with Quantum Theme

```{card} 📊 **QDaria Financial Projections & Path to Profitability**
:class-card: qdaria-chart-card quantum full-width
:class-header: sd-card-header
:class-body: sd-card-body

<div id="financialProjectionsChart" class="chart-placeholder"></div>

<script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    var years = ['2025', '2026', '2027', '2028', '2029'];
    
    var revenue = [0.5, 2.5, 8.0, 25.0, 75.0];
    var costs = [3.0, 5.0, 7.5, 12.0, 20.0];
    var netIncome = revenue.map((r, i) => r - costs[i]);
    var cumulative = [];
    var sum = 0;
    netIncome.forEach(val => {
        sum += val;
        cumulative.push(sum);
    });
    
    var data = [
        {
            x: years,
            y: revenue,
            type: 'bar',
            name: 'Revenue',
            marker: {color: '#9370DB'}
        },
        {
            x: years,
            y: costs.map(c => -c),
            type: 'bar',
            name: 'Operating Costs',
            marker: {color: '#DC143C'}
        },
        {
            x: years,
            y: cumulative,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Cumulative Cash Flow',
            line: {color: '#FFD700', width: 3},
            marker: {size: 10},
            yaxis: 'y2'
        }
    ];
    
    var layout = {
        title: {
            text: 'Financial Trajectory with Multiple Revenue Streams',
            font: {size: 24}
        },
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'Annual Flow ($ Millions)',
            zeroline: true,
            zerolinewidth: 2,
            zerolinecolor: '#000'
        },
        yaxis2: {
            title: 'Cumulative ($ Millions)',
            overlaying: 'y',
            side: 'right'
        },
        barmode: 'relative',
        hovermode: 'x unified',
        plot_bgcolor: '#FAFAFA',
        shapes: [{
            type: 'line',
            x0: '2027',
            x1: '2027',
            y0: -20,
            y1: 80,
            line: {
                color: '#32CD32',
                width: 2,
                dash: 'dot'
            }
        }],
        annotations: [{
            x: '2027',
            y: 85,
            text: 'Break-even',
            showarrow: false,
            font: {color: '#32CD32', size: 14}
        }]
    };
    
    var config = {
        responsive: true,
        displayModeBar: true,
        modeBarButtonsToAdd: ['downloadSVG']
    };
    
    Plotly.newPlot('financialProjectionsChart', data, layout, config);
});
</script>

+++
<div class="chart-description">
<span class="insight-badge">📈 3-Year CAGR: 287%</span>
<span class="insight-badge">✅ Break-even: Q4 2027</span>
<span class="insight-badge">💰 2029 Revenue: $75M</span>
Our financial model demonstrates a clear path to profitability within 3 years. Revenue 
acceleration is driven by multiple sources: quantum hardware-as-a-service subscriptions 
provide immediate recurring revenue, while our seven venture products scale through 
their respective markets. The break-even point in 2027 marks our transition from 
growth investment to sustainable profitability.
</div>
```

## Implementation Instructions

To implement these premium cards in the main business plan:

1. **Install sphinx-design** (if not already done):
   ```bash
   pip install sphinx-design>=0.5.0
   ```

2. **Replace chart sections** in `qdaria-business-plan-25.md` with the card-wrapped versions shown above

3. **Build the book** to see the enhanced presentation:
   ```bash
   jupyter-book clean . --all
   jupyter-book build .
   open _build/html/index.html
   ```

4. **Customize further** by:
   - Adjusting card colors in custom.css
   - Adding more interactive controls
   - Including data tables below charts
   - Adding export/download buttons

The premium cards transform basic embedded charts into professional, presentation-quality infographics that enhance the overall impact of the business plan.