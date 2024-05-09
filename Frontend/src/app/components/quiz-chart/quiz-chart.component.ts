import { Component } from '@angular/core';
import {LayoutService} from "../../layout/service/app.layout.service";
import {debounceTime, Subscription} from "rxjs";
import {ChartModule} from "primeng/chart";
import {QuizService} from "../../services/quiz/quiz.service";
import {QuizUserService} from "../../services/quiz-user/quiz-user.service";

@Component({
  selector: 'app-quiz-chart',
  standalone: true,
    imports: [
        ChartModule
    ],
  templateUrl: './quiz-chart.component.html',
  styleUrl: './quiz-chart.component.scss'
})
export class QuizChartComponent {
    lineData: any;

    lineOptions: any;
    barData: any;
    barOptions:any;
    pieData: any;
    pieOptions :any;

    subscription: Subscription;


    constructor(private quizService: QuizService ,private  passerQuiz :QuizUserService) { }

    ngOnInit() {
        this.getQuizData();
        this.getQuizUserParticipationData();
        this.getScore();
    }

    getQuizData() {
        this.quizService.getAllQuizzes()
            .subscribe(quizzes => {
                this.initCharts(quizzes);
            });
    }

    getQuizUserParticipationData() {
        this.passerQuiz.getQuizUserParticipationDatesAndCounts()
            .subscribe(data => {
                this.initBarChart(data);
            });
    }

    getScore(){
        this.passerQuiz.getAverageScores()
            .subscribe(data=>{
                this.initPieCharts(data)
            })
    }

    initCharts(quizzes: any[]) {
        this.getQuizUserParticipationData();

        const labels = quizzes.map(quiz => quiz.title);
        const data1 = quizzes.map(quiz => quiz.activities.length);
        const data2 = quizzes.map(quiz => quiz.questions.length);

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barData = {
            labels: labels,
            datasets: [
                {
                    label: 'Number of activities',
                    data: data1,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    tension: 0.4
                },
                {
                    label: 'Number of questions',
                    data: data2,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    tension: 0.4
                }
            ]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        this.lineData = {
            labels: labels,
            datasets: [
                {
                    label: 'Number of activities',
                    data: data1,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    tension: 0.4
                },
                {
                    label: 'Number of questions',
                    data: data2,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    tension: 0.4
                }
            ]
        };

        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
    }

    initBarChart(data: any[]) {
        const labels1 = data.map(entry => entry[0]);
        const counts1 = data.map(entry => entry[1]);

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barData = {
            labels: labels1,
            datasets: [
                {
                    label: 'Number of  Participations ',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data: counts1
                }
            ]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
    }
    initPieCharts(data) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const keys = Object.keys(data);
        const scoreTotal = Object.values(data);

// Initialiser les scores pour les mots-clés spécifiques
        let anxietyScore: unknown = 0;
        let stressScore: unknown = 0;
        let depressionScore: unknown = 0;

// Parcourir les clés pour vérifier si les mots-clés spécifiques sont présents et extraire les scores correspondants
        keys.forEach((key, index) => {
            if (key === 'Anxiety') {
                anxietyScore = scoreTotal[index];
            } else if (key === 'Stress') {
                stressScore = scoreTotal[index];
            } else if (key === 'Depression') {
                depressionScore = scoreTotal[index];
            }
        });
        this.pieData = {
            labels: ['Anxiety %', 'Stress %', 'Depression %'],
            datasets: [
                {
                    data:  [anxietyScore, stressScore, depressionScore],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400')
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }


    }
