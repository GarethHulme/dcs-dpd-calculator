const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(require('node:path').join(__dirname,'index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const elements=new Map(),listeners={};const values=new Map();
function el(id){if(!elements.has(id))elements.set(id,{id,value:'',textContent:'',innerHTML:'',className:'',addEventListener(){}});return elements.get(id)}
const context={Intl,Date,Math,Number,Map,JSON,String,console,Blob,URL,setTimeout,clearTimeout,
 window:{localStorage:{getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)}},
 document:{getElementById:el,addEventListener:(k,f)=>(listeners[k]??=[]).push(f),activeElement:null},
 fetch:async()=>{throw Error('Offline test: inherited fuel lookup')},confirm:()=>true};
vm.createContext(context);vm.runInContext(script,context);
const run=s=>vm.runInContext(s,context);
assert.equal(el('peakRate').textContent,'£2.59 / parcel');assert.equal(el('mDpdEarn').textContent,'£259.00');
assert.equal(el('dpdRate-0').textContent,'£2.59 / parcel');assert.equal(el('dpdEarn-0').textContent,'£259.00');
assert.equal(run('DPD_SCALE.rates[19][7]'),2.15);
let count=0;
for(const method of ['roundUp','nearest','roundDown','exact']){
 run(`state.bandMethod=${JSON.stringify(method)}`);
 for(const stops of run('DPD_SCALE.stopsBands'))for(const miles of run('DPD_SCALE.mileageBands')){
  const result=run(`lookupDpd(${stops},${miles})`);
  assert(result.rate>=2.59);
  const expected=run(`Math.max(259,Math.round(DPD_SCALE.rates[DPD_SCALE.stopsBands.indexOf(${stops})][DPD_SCALE.mileageBands.indexOf(${miles})]*100)+44)/100`);
  assert.equal(result.rate,expected);count++;
 }
}
run('state.bandMethod="roundUp"');
function input(id,value){const target=el(id);target.value=value;for(const f of listeners.input)f({target})}
input('mMiles','90');assert.equal(el('peakRate').textContent,'£2.62 / parcel');assert.equal(el('mDpdEarn').textContent,'£262.00');
input('mStops','150');assert.equal(el('peakRate').textContent,'£2.59 / parcel');assert.equal(el('mDpdEarn').textContent,'£388.50');
input('mStops','');assert.equal(el('peakRate').textContent,'No quote — enter valid matrix bands');
run('loadMobileState()');assert.equal(run('mState.stops'),'');
assert(run('STORAGE_KEY').includes('peak'));assert(run('MOBILE_STORAGE_KEY').includes('peak'));
assert(!values.has('dcs_dpd_exact_calculator_v2'));assert(!values.has('dcs_dpd_mobile_single_route_v1'));
const matches=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(matches).size,matches.length);
console.log(`PASS: ${count} matrix/banding comparisons; anchor £259, uplifts, floor, full script initialization, input events, saved-state isolation and unique element IDs.`);
