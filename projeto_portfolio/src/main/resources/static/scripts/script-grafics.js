var GRAFICO_CANDIDATOS = new Object();
var GRAFICO_VAGAS = new Object();
var GRAFICO_CLIENTES = new Object();
var GRAFICO_USUARIOS = new Object();

$(document).ready(function () {
    const labels = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];


    //---------------------------- informações de gráfico de candidatos---------------

    const data = {
        labels: labels,
        datasets: [{
            label: 'Novos Candidatos',
            backgroundColor: '#F9BB44',
            borderColor: '#F9BB44',
            data: [8, 125, 550, 423, 321, 200, 150, 250, 95, 88],
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "#f9ba449f",
                        font: {
                            size: 15,
                            family: 'Oswald',
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: "rgba(255, 255, 255, 0.322)",
                        font: {
                            size: 10,
                        },
                        stepSize: 1,
                        beginAtZero: true
                    }
                },
                x: {
                    ticks: {
                        color: "rgba(255, 255, 255, 0.322)",
                        font: {
                            size: 10,
                        },
                        stepSize: 1,
                        beginAtZero: true
                    }
                }
            }
        }
    };

    const myChart = new Chart(
        document.getElementById('grafic-candidatos'),
        config
    );

    GRAFICO_CANDIDATOS.dados = data

    GRAFICO_CANDIDATOS.buscarLayoutCandidatos = function () {
        $(".amb-section").load("../layouts/dashboard_grafico_candidatos.html")
    }

    //---------------------------- informações de gráfico de vagas---------------

    const data1 = {
        labels: labels,
        datasets: [{
            label: 'Novas Vagas',
            backgroundColor: '#F9BB44',
            borderColor: '#F9BB44',
            data: [15, 35, 43, 8, 89, 74, 82],
        }]
    };

    const config1 = {
        type: 'line',
        data: data1,
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "#f9ba449f",
                        font: {
                            size: 15,
                            family: 'Oswald',
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: "rgba(255, 255, 255, 0.322)",
                        font: {
                            size: 10,
                        },
                        stepSize: 1,
                        beginAtZero: true
                    }
                },
                x: {
                    ticks: {
                        color: "rgba(255, 255, 255, 0.322)",
                        font: {
                            size: 10,
                        },
                        stepSize: 1,
                        beginAtZero: true
                    }
                }
            }
        }
    };

    const myChart1 = new Chart(
        document.getElementById('grafic-vagas'),
        config1
    );

    GRAFICO_VAGAS.dados = data1

    GRAFICO_VAGAS.buscarLayoutVagas = function () {
        $(".amb-section").load("../layouts/dashboard_grafico_vagas.html")
    }

    //---------------------------- informações de gráfico de clientes---------------

    const data2 = {
        labels: labels,
        datasets: [{
            label: 'Novos Clientes',
            backgroundColor: '#F9BB44',
            borderColor: '#F9BB44',
            data: [15, 35, 43, 31,25,2],
        }]
    };

    const config2 = {
        type: 'line',
        data: data2,
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "#f9ba449f",
                        font: {
                            size: 15,
                            family: 'Oswald',
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: "rgba(255, 255, 255, 0.322)",
                        font: {
                            size: 10,
                        },
                        stepSize: 1,
                        beginAtZero: true
                    }
                },
                x: {
                    ticks: {
                        color: "rgba(255, 255, 255, 0.322)",
                        font: {
                            size: 10,
                        },
                        stepSize: 1,
                        beginAtZero: true
                    }
                }
            }
        }
    };

    const myChart2 = new Chart(
        document.getElementById('grafic-clientes'),
        config2
    );

    GRAFICO_CLIENTES.dados = data2

    GRAFICO_CLIENTES.buscarLayoutClientes = function () {
        $(".amb-section").load("../layouts/dashboard_grafico_clientes.html")
    }

    //---------------------------- informações de gráfico de Funcionários---------------

    const data3 = {
        labels: labels,
        datasets: [{
            label: 'Novos Funcionários',
            backgroundColor: '#F9BB44',
            borderColor: '#F9BB44',
            data: [3, 5, 7, 2, 36, 45],
        }]
    };

    const config3 = {
        type: 'line',
        data: data3,
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "#f9ba449f",
                        font: {
                            size: 15,
                            family: 'Oswald',
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: "rgba(255, 255, 255, 0.322)",
                        font: {
                            size: 10,
                        },
                        stepSize: 1,
                        beginAtZero: true
                    }
                },
                x: {
                    ticks: {
                        color: "rgba(255, 255, 255, 0.322)",
                        font: {
                            size: 10,
                        },
                        stepSize: 1,
                        beginAtZero: true
                    }
                }
            }
        }
    };

    const myChart3 = new Chart(
        document.getElementById('grafic-usuarios'),
        config3
    );

    GRAFICO_USUARIOS.dados = data3

    GRAFICO_USUARIOS.buscarLayoutUsuarios = function () {
        $(".amb-section").load("../layouts/dashboard_grafico_usuarios.html")
    }

    window.addEventListener('resize', function () {

        var total = document.body.clientWidth

        if (total < 800) {
            $(".amb-grafics").css({ width: total - 150 + "px" })
        } else {
            $(".amb-grafics").css({ width: "98%" })
        }

    });
})