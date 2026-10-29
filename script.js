const $ = (id) => document.getElementById(id);
let valueChart, priceChart;
const samplePrices = [100, 103, 101, 106, 104, 109, 107, 112, 110, 115, 113, 118];
function money(n){return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(n);}
function pct(n){return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;}
function renderCharts(investment,current){
  const ctx1=$('valueChart').getContext('2d');
  const ctx2=$('priceChart').getContext('2d');
  if(valueChart)valueChart.destroy(); if(priceChart)priceChart.destroy();
  valueChart=new Chart(ctx1,{type:'bar',data:{labels:['Invested amount','Current value'],datasets:[{label:'Value (₹)',data:[investment,current],backgroundColor:['#7b9cff','#4de0b2'],borderRadius:8,borderSkipped:false}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#a8b6d0'},grid:{display:false}},y:{beginAtZero:true,ticks:{color:'#a8b6d0',callback:v=>'₹'+Number(v).toLocaleString('en-IN')},grid:{color:'#26334d'}}}}});
  priceChart=new Chart(ctx2,{type:'line',data:{labels:['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'],datasets:[{label:'Illustrative price',data:samplePrices,borderColor:'#7b9cff',backgroundColor:'#7b9cff22',fill:true,tension:.35,pointRadius:2,pointBackgroundColor:'#4de0b2'}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#a8b6d0'},grid:{display:false}},y:{ticks:{color:'#a8b6d0'},grid:{color:'#26334d'}}}}});
}
function calculateVolatility(){
  const returns=[]; for(let i=1;i<samplePrices.length;i++)returns.push(samplePrices[i]/samplePrices[i-1]-1);
  const mean=returns.reduce((a,b)=>a+b,0)/returns.length;
  const variance=returns.reduce((a,b)=>a+(b-mean)**2,0)/(returns.length-1);
  return Math.sqrt(variance)*Math.sqrt(12)*100;
}
function analyze(){
  const investment=Number($('investment').value), current=Number($('currentValue').value), months=Number($('months').value), benchmark=Number($('benchmark').value);
  if(!Number.isFinite(investment)||investment<=0||!Number.isFinite(current)||current<0||!Number.isFinite(months)||months<=0||!Number.isFinite(benchmark)){alert('Please enter a positive investment, non-negative current value, and a period greater than zero.');return;}
  const profit=current-investment, total=(profit/investment)*100, annualized=(Math.pow(current/investment,12/months)-1)*100;
  const comparison=annualized-benchmark;
  $('metricValue').textContent=money(current);
  $('metricPL').textContent=(profit>=0?'+':'−')+money(Math.abs(profit));
  $('metricPL').className=profit>=0?'positive':'negative';
  $('metricPLPct').textContent=`${pct(total)} total return`;
  $('metricAnnual').textContent=pct(annualized);
  $('metricBenchmark').textContent=`${comparison>=0?'+':''}${comparison.toFixed(2)} pp`;
  $('metricBenchmark').className=comparison>=0?'positive':'negative';
  const vol=calculateVolatility();
  $('volatility').innerHTML=`${vol.toFixed(1)}%<span> annualized</span>`;
  $('riskMeter').style.width=Math.min(100,vol*2)+'%';
  const insights=[];
  insights.push(profit>=0?`Your entered current value is ${money(profit)} above the investment amount.`:`Your entered current value is ${money(Math.abs(profit))} below the investment amount.`);
  insights.push(`The total return for the entered period is ${pct(total)}. This is based only on the values you entered.`);
  insights.push(comparison>=0?`The estimated annualized return is ${comparison.toFixed(2)} percentage points above the benchmark you entered.`:`The estimated annualized return is ${Math.abs(comparison).toFixed(2)} percentage points below the benchmark you entered.`);
  insights.push(`Sample-series annualized volatility is ${vol.toFixed(1)}%. This is an illustrative measure of variation, not a forecast of future risk.`);
  insights.push('Consider fees, taxes, diversification, time horizon and your own risk tolerance before making financial decisions.');
  $('insights').innerHTML=insights.map(x=>`<li>${x}</li>`).join('');
  renderCharts(investment,current);
}
$('analyzeBtn').addEventListener('click',analyze);
$('sampleBtn').addEventListener('click',()=>{$('investment').value=50000;$('currentValue').value=56000;$('months').value=12;$('benchmark').value=8;analyze();});
analyze();