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

# QDaria Competitive Intelligence Visualizations

```{include} _chart_assets.md
```

## 1. Competitive Positioning Spider Chart

<div id="competitiveSpiderChart" style="width: 100%; height: 600px;"></div>

<script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Define the dimensions for competitive analysis
    var dimensions = [
        'Technology Innovation',
        'Market Reach', 
        'Team Expertise',
        'Funding',
        'Patent Portfolio',
        'Customer Base',
        'Partnership Network'
    ];
    
    // Competitive scoring data (0-100 scale)
    var competitorData = [
        {
            name: 'QDaria',
            data: [95, 45, 90, 35, 60, 30, 85],
            color: '#00CED1',  // QDaria teal
            fillcolor: 'rgba(0, 206, 209, 0.3)'
        },
        {
            name: 'IBM Quantum',
            data: [85, 95, 95, 100, 95, 90, 90],
            color: '#1F70C1',
            fillcolor: 'rgba(31, 112, 193, 0.2)'
        },
        {
            name: 'Google Quantum AI',
            data: [100, 85, 100, 100, 90, 75, 85],
            color: '#EA4335',
            fillcolor: 'rgba(234, 67, 53, 0.2)'
        },
        {
            name: 'Microsoft Azure Quantum',
            data: [90, 90, 95, 100, 85, 85, 95],
            color: '#00BCF2',
            fillcolor: 'rgba(0, 188, 242, 0.2)'
        },
        {
            name: 'Rigetti Computing',
            data: [80, 60, 85, 70, 75, 50, 70],
            color: '#8B4789',
            fillcolor: 'rgba(139, 71, 137, 0.2)'
        }
    ];
    
    var traces = competitorData.map(competitor => ({
        type: 'scatterpolar',
        r: competitor.data,
        theta: dimensions,
        fill: 'toself',
        fillcolor: competitor.fillcolor,
        name: competitor.name,
        line: {
            color: competitor.color,
            width: 3
        },
        marker: {
            color: competitor.color,
            size: 8,
            symbol: competitor.name === 'QDaria' ? 'star' : 'circle'
        },
        hovertemplate: '<b>%{fullData.name}</b><br>' +
                      '%{theta}: %{r}<br>' +
                      '<extra></extra>'
    }));
    
    var layout = {
        title: {
            text: 'Competitive Positioning Analysis: QDaria vs Major Quantum Players',
            font: {
                size: 24,
                color: '#2c3e50',
                family: 'Arial, sans-serif'
            },
            y: 0.98
        },
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 100],
                tickfont: {
                    size: 12,
                    color: '#7f8c8d'
                },
                gridcolor: 'rgba(0,0,0,0.1)',
                tickvals: [20, 40, 60, 80, 100],
                ticktext: ['20', '40', '60', '80', '100']
            },
            angularaxis: {
                tickfont: {
                    size: 14,
                    color: '#2c3e50',
                    family: 'Arial, sans-serif'
                },
                linecolor: 'rgba(0,0,0,0.2)',
                gridcolor: 'rgba(0,0,0,0.1)'
            },
            bgcolor: 'rgba(250,250,252,0.3)'
        },
        paper_bgcolor: 'rgba(255,255,255,0)',
        showlegend: true,
        legend: {
            x: 1.1,
            y: 0.5,
            bgcolor: 'rgba(255,255,255,0.9)',
            bordercolor: 'rgba(0,0,0,0.2)',
            borderwidth: 1,
            font: {
                size: 14,
                color: '#2c3e50'
            }
        },
        margin: {
            t: 100,
            b: 50,
            l: 80,
            r: 200
        },
        annotations: [
            {
                text: '<i>QDaria excels in Technology Innovation and Team Expertise,<br>with strategic partnerships compensating for lower funding</i>',
                x: 0.5,
                y: -0.15,
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                font: {
                    size: 12,
                    color: '#7f8c8d'
                },
                xanchor: 'center'
            }
        ],
        hoverlabel: {
            bgcolor: '#fff',
            bordercolor: '#333',
            font: {
                size: 14,
                color: '#333'
            }
        }
    };
    
    var config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
        toImageButtonOptions: {
            format: 'png',
            filename: 'qdaria_competitive_positioning',
            height: 800,
            width: 1200,
            scale: 2
        }
    };
    
    Plotly.newPlot('competitiveSpiderChart', traces, layout, config);
});
</script>

## 2. QDaria Business Model Canvas

<div id="businessModelCanvas" style="width: 100%; height: 700px;"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Business Model Canvas data
    var canvasBlocks = [
        // Row 1
        {
            block: 'Key Partners',
            x: 0, y: 2, width: 1, height: 2,
            content: [
                '• Rigetti Computing (Hardware)',
                '• Bluefors (Cryogenics)',
                '• Norwegian Universities',
                '• Government R&D Programs',
                '• Cloud Providers (AWS, Azure)',
                '• Quantum Research Labs'
            ],
            color: '#3498db',
            icon: '🤝'
        },
        {
            block: 'Key Activities',
            x: 1, y: 2.5, width: 1, height: 1,
            content: [
                '• Topological QC Research',
                '• AI/Quantum Integration',
                '• Software Development',
                '• Hardware Operations',
                '• Customer Support'
            ],
            color: '#e74c3c',
            icon: '⚡'
        },
        {
            block: 'Key Resources',
            x: 1, y: 1.5, width: 1, height: 1,
            content: [
                '• PhD-level Team',
                '• Novera QPU Access',
                '• IP & Patents',
                '• Oslo Quantum Lab',
                '• AI Models & Data'
            ],
            color: '#e74c3c',
            icon: '💎'
        },
        {
            block: 'Value Propositions',
            x: 2, y: 2, width: 1, height: 2,
            content: [
                '• First Fault-Tolerant QC',
                '• Quantum+AI Integration',
                '• Hardware Access Service',
                '• User-Friendly Interfaces',
                '• Industry-Specific Solutions',
                '• Educational Platform'
            ],
            color: '#9b59b6',
            icon: '🎯',
            highlight: true
        },
        {
            block: 'Customer Relationships',
            x: 3, y: 2.5, width: 1, height: 1,
            content: [
                '• B2B Partnerships',
                '• SaaS Subscriptions',
                '• Educational Programs',
                '• Community Building',
                '• 24/7 AI Support'
            ],
            color: '#2ecc71',
            icon: '💚'
        },
        {
            block: 'Channels',
            x: 3, y: 1.5, width: 1, height: 1,
            content: [
                '• Direct Sales',
                '• Cloud Platforms',
                '• Partner Networks',
                '• Conferences',
                '• Online Education'
            ],
            color: '#2ecc71',
            icon: '📡'
        },
        {
            block: 'Customer Segments',
            x: 4, y: 2, width: 1, height: 2,
            content: [
                '• Financial Institutions',
                '• Government Agencies',
                '• Research Universities',
                '• Healthcare/Pharma',
                '• Tech Companies',
                '• Students/Educators'
            ],
            color: '#f39c12',
            icon: '👥'
        },
        // Row 2
        {
            block: 'Cost Structure',
            x: 0, y: 0, width: 2.5, height: 1.5,
            content: [
                '• R&D Investment (40%)',
                '• Team Salaries (35%)',
                '• Hardware/Infrastructure (15%)',
                '• Cloud Services (5%)',
                '• Marketing/Sales (5%)'
            ],
            color: '#e67e22',
            icon: '💰'
        },
        {
            block: 'Revenue Streams',
            x: 2.5, y: 0, width: 2.5, height: 1.5,
            content: [
                '• SaaS Subscriptions (Qm9, Zipminator)',
                '• Hardware Rental Fees',
                '• Enterprise Licenses',
                '• Consulting Services',
                '• Government Contracts',
                '• Future: Spin-off IPOs'
            ],
            color: '#27ae60',
            icon: '💵',
            highlight: true
        }
    ];
    
    // Create shapes for canvas blocks
    var shapes = canvasBlocks.map(block => ({
        type: 'rect',
        x0: block.x,
        y0: block.y,
        x1: block.x + block.width,
        y1: block.y + block.height,
        fillcolor: block.highlight ? block.color : block.color + '20',
        line: {
            color: block.color,
            width: block.highlight ? 3 : 2
        },
        layer: 'below'
    }));
    
    // Create annotations for blocks
    var annotations = [];
    canvasBlocks.forEach(block => {
        // Title annotation
        annotations.push({
            x: block.x + block.width/2,
            y: block.y + block.height - 0.1,
            text: `<b>${block.icon} ${block.block}</b>`,
            showarrow: false,
            font: {
                size: 16,
                color: block.color,
                family: 'Arial, sans-serif'
            },
            xanchor: 'center',
            yanchor: 'top'
        });
        
        // Content annotation
        annotations.push({
            x: block.x + block.width/2,
            y: block.y + block.height/2 - 0.1,
            text: block.content.join('<br>'),
            showarrow: false,
            font: {
                size: 11,
                color: '#2c3e50',
                family: 'Arial, sans-serif'
            },
            xanchor: 'center',
            yanchor: 'middle',
            align: 'left'
        });
    });
    
    // Add title annotation
    annotations.push({
        x: 2.5,
        y: 4.2,
        text: '<b>QDaria Business Model Canvas</b>',
        showarrow: false,
        font: {
            size: 28,
            color: '#2c3e50',
            family: 'Arial, sans-serif'
        },
        xanchor: 'center'
    });
    
    // Add differentiator callouts
    annotations.push({
        x: 2,
        y: 1.2,
        text: '⭐ <b>Unique Differentiator:</b><br>First company combining Topological QC<br>with Agentic AI interfaces',
        showarrow: true,
        arrowhead: 2,
        arrowsize: 1,
        arrowwidth: 2,
        arrowcolor: '#00CED1',
        ax: -80,
        ay: -60,
        bgcolor: 'rgba(0, 206, 209, 0.9)',
        bordercolor: '#00CED1',
        borderwidth: 2,
        borderpad: 8,
        font: {
            size: 12,
            color: '#fff'
        },
        align: 'left'
    });
    
    var data = [{
        type: 'scatter',
        x: [2.5],
        y: [2],
        mode: 'markers',
        marker: {
            size: 0.1,
            color: 'transparent'
        },
        showlegend: false,
        hoverinfo: 'skip'
    }];
    
    var layout = {
        xaxis: {
            range: [-0.2, 5.2],
            showgrid: false,
            zeroline: false,
            showticklabels: false,
            fixedrange: true
        },
        yaxis: {
            range: [-0.2, 4.5],
            showgrid: false,
            zeroline: false,
            showticklabels: false,
            fixedrange: true
        },
        shapes: shapes,
        annotations: annotations,
        paper_bgcolor: 'rgba(255,255,255,0)',
        plot_bgcolor: 'rgba(250,250,252,0.5)',
        margin: {
            t: 50,
            b: 50,
            l: 50,
            r: 50
        },
        hoverlabel: {
            bgcolor: '#fff',
            bordercolor: '#333',
            font: {
                size: 14,
                color: '#333'
            }
        }
    };
    
    var config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d', 'zoom2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d'],
        toImageButtonOptions: {
            format: 'png',
            filename: 'qdaria_business_model_canvas',
            height: 800,
            width: 1400,
            scale: 2
        }
    };
    
    Plotly.newPlot('businessModelCanvas', data, layout, config);
});
</script>

## 3. Team Expertise Heat Map

<div id="teamExpertiseHeatmap" style="width: 100%; height: 600px;"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Team members
    var teamMembers = [
        'Daniel "Mo" Houshmand<br><i>CEO & Co-founder</i>',
        'Prof. Astrid Sølberg<br><i>CSO & Co-founder</i>',
        'Dr. Erik Johannessen<br><i>CTO & Co-founder</i>',
        'Dr. Nina Patel<br><i>Chief AI Scientist</i>',
        'Quantum Algo Researcher<br><i>ETH Zurich PhD</i>',
        'Senior DevOps Engineer<br><i>Fintech Background</i>',
        'Business Dev Lead<br><i>Tech Transfer Expert</i>',
        'Prof. Leif Hansen<br><i>Strategic Advisor</i>',
        'Dr. Maria Gomez<br><i>Pharma Advisor</i>'
    ];
    
    // Expertise domains
    var domains = [
        'Quantum Physics',
        'Software Engineering',
        'AI/Machine Learning',
        'Business Development',
        'Mathematics',
        'Hardware Engineering',
        'Project Management',
        'Industry Networks',
        'Academic Research'
    ];
    
    // Expertise matrix (0-10 scale)
    var expertiseMatrix = [
        [7, 5, 6, 8, 9, 4, 9, 7, 6],  // Mo - polymath
        [10, 3, 2, 2, 8, 7, 4, 6, 10], // Astrid - quantum expert
        [4, 10, 5, 3, 6, 8, 7, 5, 4],  // Erik - software architect
        [3, 7, 10, 3, 7, 2, 5, 4, 8],  // Nina - AI expert
        [9, 6, 7, 1, 9, 3, 3, 2, 9],   // Quantum Researcher
        [2, 9, 4, 2, 3, 9, 8, 6, 2],   // DevOps Engineer
        [1, 3, 2, 10, 2, 2, 8, 9, 3],  // Business Dev
        [2, 2, 2, 8, 3, 2, 7, 10, 5],  // Prof Hansen - networks
        [2, 2, 3, 7, 3, 1, 5, 8, 6]    // Dr Gomez - pharma
    ];
    
    // Detailed bios for hover
    var bios = [
        'Iranian-Norwegian polymath with M.Sc. in Applied Math & Physics, B.Sc. Civil Engineering, B.A. Art & Design. Founded QDaria in 2018, previously created Zipminator cybersecurity tool.',
        'Professor at NTNU, studied under anyon theory pioneer Jon Magne Leinaas. Leading expert in topological phases of matter and condensed matter physics.',
        'PhD Computer Science from University of Oslo, former IBM Emerging Tech division. Expert in distributed systems, cloud architecture, and quantum-classical integration.',
        'PhD Machine Learning from Cambridge, former DeepMind researcher. Specializes in multi-agent systems and explainable AI for quantum applications.',
        'Former ETH Zurich postdoc specializing in quantum optimization algorithms. Key contributor to QDaria\'s quantum algorithm library.',
        'Experienced in fintech infrastructure, manages QDaria\'s cloud and CI/CD pipelines. Ensures scalable and secure quantum computing services.',
        'Former tech transfer office lead, forging industry partnerships and pilot programs. Bridges academic research with commercial applications.',
        'Prominent figure in Norway\'s tech ecosystem, provides strategic guidance on scaling and market positioning.',
        'Pharmaceutical industry veteran advising QNilaya\'s quantum-enhanced drug discovery platform development.'
    ];
    
    // Create hover text matrix
    var hoverText = [];
    for (var i = 0; i < teamMembers.length; i++) {
        var row = [];
        for (var j = 0; j < domains.length; j++) {
            var level = expertiseMatrix[i][j];
            var levelText = level >= 8 ? 'Expert' : level >= 6 ? 'Advanced' : level >= 4 ? 'Intermediate' : level >= 2 ? 'Basic' : 'Limited';
            row.push(`<b>${teamMembers[i].split('<br>')[0]}</b><br>${domains[j]}: ${levelText} (${level}/10)<br><br><i>${bios[i]}</i>`);
        }
        hoverText.push(row);
    }
    
    var data = [{
        type: 'heatmap',
        z: expertiseMatrix,
        x: domains,
        y: teamMembers,
        colorscale: [
            [0, '#f8f9fa'],
            [0.2, '#e3f2fd'],
            [0.4, '#64b5f6'],
            [0.6, '#1976d2'],
            [0.8, '#0d47a1'],
            [1, '#00CED1']
        ],
        showscale: true,
        colorbar: {
            title: {
                text: 'Expertise Level',
                font: {
                    size: 14,
                    color: '#2c3e50'
                }
            },
            tickmode: 'array',
            tickvals: [0, 2, 4, 6, 8, 10],
            ticktext: ['0', '2', '4', '6', '8', '10<br>Expert'],
            len: 0.8,
            thickness: 20,
            outlinecolor: 'rgba(0,0,0,0.1)',
            outlinewidth: 1
        },
        hovertemplate: '%{hovertext}<extra></extra>',
        hovertext: hoverText,
        hoverlabel: {
            bgcolor: 'rgba(255,255,255,0.95)',
            bordercolor: '#333',
            font: {
                size: 12,
                color: '#333',
                family: 'Arial, sans-serif'
            },
            align: 'left'
        }
    }];
    
    // Add text annotations for cell values
    var annotations = [];
    for (var i = 0; i < teamMembers.length; i++) {
        for (var j = 0; j < domains.length; j++) {
            var value = expertiseMatrix[i][j];
            if (value >= 7) {  // Only show high expertise values
                annotations.push({
                    x: j,
                    y: i,
                    text: value.toString(),
                    showarrow: false,
                    font: {
                        size: 12,
                        color: value >= 9 ? '#fff' : '#2c3e50',
                        family: 'Arial, sans-serif'
                    }
                });
            }
        }
    }
    
    var layout = {
        title: {
            text: 'QDaria Team Expertise Heat Map - Deep Bench Strength Across Domains',
            font: {
                size: 24,
                color: '#2c3e50',
                family: 'Arial, sans-serif'
            }
        },
        xaxis: {
            side: 'top',
            tickangle: -45,
            tickfont: {
                size: 13,
                color: '#2c3e50'
            }
        },
        yaxis: {
            autorange: 'reversed',
            tickfont: {
                size: 12,
                color: '#2c3e50'
            }
        },
        annotations: annotations.concat([
            {
                text: '<i>Hover over cells for detailed team member bios and expertise levels</i>',
                x: 0.5,
                y: -0.08,
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                font: {
                    size: 12,
                    color: '#7f8c8d'
                },
                xanchor: 'center'
            },
            {
                text: '⭐ <b>Key Insight:</b> Rare combination of deep quantum physics expertise<br>with strong AI/ML and business development capabilities',
                x: 1.05,
                y: 0.5,
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                bgcolor: 'rgba(0, 206, 209, 0.1)',
                bordercolor: '#00CED1',
                borderwidth: 2,
                borderpad: 8,
                font: {
                    size: 11,
                    color: '#2c3e50'
                },
                align: 'left',
                xanchor: 'left'
            }
        ]),
        paper_bgcolor: 'rgba(255,255,255,0)',
        plot_bgcolor: 'rgba(250,250,252,0.9)',
        margin: {
            t: 150,
            b: 80,
            l: 200,
            r: 250
        },
        hoverlabel: {
            bgcolor: '#fff',
            bordercolor: '#333',
            font: {
                size: 12,
                color: '#333'
            }
        }
    };
    
    var config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
        toImageButtonOptions: {
            format: 'png',
            filename: 'qdaria_team_expertise',
            height: 800,
            width: 1200,
            scale: 2
        }
    };
    
    Plotly.newPlot('teamExpertiseHeatmap', data, layout, config);
});
</script>

## Key Insights from Competitive Intelligence Analysis

### 1. **Competitive Positioning**
- QDaria leads in **Technology Innovation** (95/100) with its unique topological quantum computing approach using Fibonacci anyons
- Strong **Team Expertise** (90/100) combining quantum physics, AI, and business acumen
- **Partnership Network** (85/100) compensates for lower funding through strategic alliances with Rigetti, Bluefors, and Norwegian institutions
- Room for growth in **Market Reach** and **Customer Base** as QDaria scales from startup to market leader

### 2. **Business Model Differentiation**
- **Unique Value Proposition**: First company combining fault-tolerant topological quantum computing with user-friendly AI interfaces
- **Diversified Revenue Streams**: SaaS subscriptions, hardware rentals, enterprise licenses, and future spin-off IPOs
- **Capital-Efficient Strategy**: Hardware-agnostic approach reduces capital requirements compared to competitors building their own quantum chips
- **Multi-Product Ecosystem**: Seven venture-ready products create synergies and multiple paths to market

### 3. **Team Composition Advantages**
- **Interdisciplinary Leadership**: CEO with rare combination of quantum physics, mathematics, and artistic creativity
- **Deep Technical Bench**: ~50% PhD-level expertise across quantum physics, AI/ML, and software engineering
- **Commercial Experience**: Strong business development and industry connections balance academic prowess
- **Advisory Network**: Strategic advisors from Norwegian tech ecosystem and pharmaceutical industry

### Investment Opportunity Summary
QDaria represents a unique investment opportunity at the intersection of quantum computing and AI, with:
- First-mover advantage in topological quantum computing
- Capital-efficient business model leveraging partnerships
- World-class interdisciplinary team
- Multiple revenue streams and exit opportunities through spin-offs
- Strategic position to capture value in the $1.3 trillion quantum market by 2035