# PGA Tour Statistics

## Table of Contents

<!--ts-->

- [Table of contents](#Table-of-Contents)
- [About](#About)
  - [Functionality/UX](#Functionality-and-UX)
  - [The Data](#The-Data)
- [Technologies](#Technologies)
  - [Languages/Frameworks/Libraries/Tools](#Languages-Frameworks-Libraries-Tools)
  - [Other Resources](#Other-Resources)
  - [About the Charts](#About-the-Charts)
- [Testing](#Testing)
  - [Tools and Methods Used for Testing](#Tools-and-Methods-Used-for-Testing)
  - [Additional Notes](#Additional-Notes)
  [Futures](#Futures)
  - [Potential Enhancements](#Potential-Enhancements)
- [Deployment](#Deployment)
- [Credits](#Credits)
  - [Content](#Content)
  - [Acknowledgements](#Acknowledgements)
    <!--te-->

## About

Milestone Project Two / Interactive Frontend Development / Code Institute

This application shows various PGA Tour statistics from the years 2002 - 2019. The data was scraped from the pgatour.com website. See Data section for more explanation.

#### Functionality and UX

The application shows data for the following statistics. Each has a designated panel and its own collapsible sections. The statistics are:
- Driving Accuracty
- Greens In Regulation (GIR)
- GIR 200+ Yards
- GIR 175-200 Yards
- GIR 150-175 Yards
- GIR 125-150 Yards
- GIR 100-125 Yards
- Scrambling (Up and Down)
- Sand Saves 

The collapsible sections art controlled via the "View Chart" and "By the Numbers" buttons for each panel/statistic
- Data for statistic displayed via a line chart
- Data for statistic in a numerical list format

There is data for each statistic from the years 2002 - 2019. Selecting the year from the dropdown control will dynamically update the data displayed in each of the statics' sections, both the line chart and the numerical list display.

#### The Data

When embarking upon the project, I knew I wanted to do something with charts/graphs. Being an avid golfer and a PGA Tour fan, I first decided to see what ready-made JSON datasets there were available for the PGA.
I didn't find anything. However, I did happen upon something on github (see Acknowledgements section). It was a great starting point. There was a bug in it as something had changed on the website.
I modified that code to fix the bug as well as add additional data to produce my input data file.

## Technologies

#### Languages Frameworks Libraries Tools

- [HTML5](https://www.w3.org/TR/html5/ "HTML5 Official Site")

- [CSS3](https://www.w3.org/Style/CSS/ "Cascading Style Sheets Official Site")

- [jQuery](http://jquery.com/ "jQuery Official Site")

- [dc](https://dc-js.github.io/dc.js/ "Dimensional Charting JavaScript Library")

- [d3](https://d3js.org/ "Data-Driven Documents")
 
- [crossfilter.js](https://github.com/crossfilter/crossfilter/ "Grouping and Filtering Data")

- [queue](https://github.com/d3/d3-queue/ "Queueing and Deferring Asynchronous Tasks")

- [Chart.js](https://www.chartjs.org/ "JavaScript Charting")

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/ "JavaScript Official Site")

- [Bootstrap - v4.1.1](https://getbootstrap.com/docs/4.1/getting-started/introduction/ "Bootstrap Official Site")

- [Font Awesome - v5.0.13](https://fontawesome.com/ "Fontawesome Official Site")

- [Python](https://www.python.org/ "Python Official Site")
Used for running a script/spider to scrape the PGA Tour website

- [Scrapy](https://scrapy.org/ "Scrapy - Web Scraping")
Used for scraping the pgatour.com site for the data used

#### Other Resources

- https://getbootstrap.com/
- https://www.w3schools.com/
- https://stackoverflow.com/
- https://slack.com/

#### About the Charts

One might ask, "if you are using dc and d3, why are you also using Chart.js?" Great question. As there was very little grouping, summing and aggregating required, I was struggling with
crossfilter and dc to chart the data correctly. In essence, each record within my JSON file is indeed the data that is charted; no aggregating required. Chart.js is perfect for this, more
simplistic chart creation. I am using the aforemention libraries for some grouping but that is it. All charting is done by Chart.js.

And a final note about this. I actually find Chart.js easier to work with that dc and d3.

#### Potential Enhancements

There is immense potential improvement to this application. Some that come to mind are:

- Dynamically adding and removing statistics for different years and displaying in the same chart. That woud be very cool.
- Associating the players with the finishing positions (1st, 10th, etc.)
- Adding putting statistical data. There is putting in the data.json file. However, I was already behind schedule, so I didn't put it on the website.

## Testing

#### Tools and Methods Used for Testing

- [HTML Validation](https://validator.w3.org/ "W3C Markup Validation Service")
- [CSS Validation](http://jigsaw.w3.org/css-validator/ "CSS Validation Service")
- [JavaScript Linting](https://eslint.org/ "JavaScript Linting Service")
- [JavaScript Data Structure Testing](https://jsbin.com/ "JSFiddle-Like Service")
- Chrome Developer Tools

#### Additional Notes

I used a lot of visual comparison of the original data set with what was displayed in the charts. In addition, I literally stepped over every line of JavaScript code via Chrome Developer Tools

## Deployment

- Used GitHub Pages to deploy the final version (https://github.com/mrbrown2207/mrbmsII).

## Credits

#### Content

- All written content is bespoke and created by the code author (Michael Brown).
- Images used are royalty-free, downloaded from the web

#### Acknowledgements

- Sipo Charles' for his readme.md file. I started with it as I liked the structure.
- Anonija Šimić for her help with some formatting issues I had and CSS guidance.....I love CSS Variables!
- Zach Golwitzer for his PGA Tour website scraping code. I started with it and modified it for my scraping purposes. https://github.com/zachgoll/pga-tour-stats.