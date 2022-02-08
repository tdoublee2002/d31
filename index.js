let datas = []
let years =[35, 21, 0, 38, 77, 32, 44, 47, 80, 37, 50,
  62, 49, 92, 63, 62, 72, 63, 157, 83, 65,
  103, 90, 87, 183, 86, 109, 108, 95, 72, 92]
for(let i = 0; i < 32; i++){
  const data ={}
  data.year = (1959+2*i).toString()
  data.NumGM = years[i]
  datas.push(data);
}

const width  = 1500;
const height = 600;
const margin = { top: 50, bottom: 50, left: 50, right: 50}

const svg = d3.select('#d3-container')
  .append('svg')
  .attr('height', height - margin.top - margin.bottom)
  .attr('width', width - margin.left - margin.right)
  .attr('ViewBox', [0, 0, width, height]);

const x = d3.scaleBand()

  .domain(d3.range(datas.length))
  .range([margin.left, width - margin.right])
  .padding(0.3);

const y = d3.scaleLinear()
  .domain([-40, 200])
  .range([height - margin.bottom, margin.top]);

svg
  .append('g')
  .attr('fill', 'gold')
  .selectAll('rect')
  .data(datas)
  .join('rect')
    .attr('x', (d, i) => x(i))
    .attr('y', (d) => y(d.NumGM))
    .attr('height', d => y(0) - y(d.NumGM))
    .attr('width', x.bandwidth())
    .attr('class','rectangle')

function xAxis(g){
  g.attr('transform',`translate(0, ${height - 130})`)
  .call(d3.axisBottom(x).tickFormat(i => datas[i].year))
  .attr('font-size','10px')
} 

function yAxis(g){
  g.attr('transform', `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(y).tickFormat(null, datas.format))
  .attr('font-size','10px')
}

svg.append('g').call(yAxis);
svg.append('g').call(xAxis);
svg.node();

