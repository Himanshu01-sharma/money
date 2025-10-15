 const Base_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

 const dropdowns=document.querySelectorAll(".dropdown select");
 const btn=document.querySelector("form button");
 const fromCurr=document.querySelector(".from select");
  const toCurr =document.querySelector(".to select");
  const msg = document.querySelector(".msg");
 
for(let select of dropdowns){
for (code in countryList){
   let newoption= document.createElement("option");
   newoption.innerText=code;
   newoption.value=code;
   if(select.name=="from" && code=="USD"){
    newoption.selected="selected";
   }
   else if(select.name=="to" && code=="INR"){
    newoption.selected="selected";
   }
   select.append(newoption);


}
select.addEventListener("change",(evt)=>{
   updateFlag(evt.target);
});
}

const updateFlag =(element)=>{
   
   let currcode=element.value;
   let countrycode=countryList[currcode];
   let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src=newSrc;
};

btn.addEventListener("click", async (evt)=>{
   evt.preventDefault();
   let amount=document.querySelector(".amount input");
   let amtval=amount.value;
   console.log(amtval);
   if(amtval=="" || amtval<1){
      amtval=1;
      amount.value=1;
   }
  // console.log(fromCurr.value,toCurr.value);
   const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();
  const URL = `${Base_URL}/${from}.json`; // <-- corrected here

  try {
    const response = await fetch(URL);
    if (!response.ok) {
      console.error("Error fetching data:", response.status);
      msg.innerText = `Error fetching rates (${response.status})`;
      return;
    }

    const data = await response.json();
    console.log("API response:", data);

    const rate = data[from] && data[from][to];
    if (typeof rate !== "number") {
      msg.innerText = `Rate ${from.toUpperCase()} → ${to.toUpperCase()} not available`;
      return;
    }

    const finalAmount = (amtval * rate).toFixed(2);
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    console.error("Fetch error:", error);
    msg.innerText = "Network error. Check console for details.";
  }
   
});
 //                      There is soething thatis dii                                                     //



