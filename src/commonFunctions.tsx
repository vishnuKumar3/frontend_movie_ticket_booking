export const makeJSONDownloadable = (jsonData:any,fileName:any)=>{
  const jsonString = JSON.stringify(jsonData,null,2);

  const blob = new Blob([jsonString], {type: "application/json"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}