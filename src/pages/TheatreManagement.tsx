import { colors } from "../color_config"
import { makeStyles } from "@mui/styles"
import { useDispatch, useSelector } from "react-redux"
import {useFormik} from "formik"
import { useState } from "react"
import {message} from "antd";
import { UseDispatch } from "react-redux"
import { addMovieData } from "../reducers/movies"
import {makeJSONDownloadable} from '../commonFunctions.tsx'
import {SAMPLE_SEAT_STRUCTURE} from "../defaultConfig.tsx"
import { addTheatre } from "../reducers/theatres.tsx"

export default function TheatreManagement(){
    const [messageApi, contextHolder] = message.useMessage()
    const dispatch = useDispatch();
    const [submissionError, setSubmissionError] = useState("");

    const titleComponent = (title:string)=>{ 
      return(<>
        <p style={{color:"black",fontWeight:700,fontSize:"15px"}}>{title} :</p>
      </>)
    }

    const inputComponent = (type:string, name:string,required:boolean)=>{
      return(
        <>
          <input type={type} value={formik.values[name]} onChange={formik.handleChange} required={required} className="rounded w-full" name={name} style={{fontWeight:600,border:`1px solid ${colors.inputGrayVariant}`,height:"30px",padding:"5px"}}/>
        </>
      )
    }

    const combinedComponent = (title:any, input:any)=>{
      return(
        <>
          <div className="flex flex-col justify-start gap-y-2 w-full">
            {title}
            {input}
          </div>
        </>
      )
    }

    const validateJson = (jsonData:any)=>{
      try{
        JSON.parse(jsonData)
        return true;
      }
      catch(err:any){
        setSubmissionError("Invalid JSON - "+err?.message || "Please provide a valid JSON")
        return false;
      }
    }

    const formatDataAndSubmit = (values:any, resetForm:any)=>{
      if(validateJson(values?.seatStructure)){
        values["seatStructure"] = JSON.parse(values["seatStructure"])
        setSubmissionError("");
        dispatch(addTheatre(values)).then((action:any)=>{
          if(action?.error){
            messageApi.error({content:action?.payload?.message, duration:5})
          }
          else{
            resetForm();
            messageApi.success({content:action?.payload?.message,duration:5})
          }
        }).catch((err:any)=>{
          messageApi.error({content:err?.message, duration:5})
        })     
      } 
    }

    const formik = useFormik({
      initialValues: {
        theatreName:"",
        seatingCapacity:0,
        location:"",
        seatStructure:{}
      },
      onSubmit: (values:any,{resetForm}) => {
        console.log("values",values)
        formatDataAndSubmit(values, resetForm);
      },
    });    

  return(
    <>
      <div className="w-full p-5 flex flex-col items-center justify-center gap-y-10 pb-10">
        <h2>Theatre Management</h2>
        {contextHolder}
        <form onSubmit={formik.handleSubmit} className="w-11/12 lg:w-96 flex flex-col items-start gap-y-3">
          {combinedComponent(titleComponent('TheatreName'),inputComponent("text","theatreName",true))}
          {combinedComponent(titleComponent('SeatingCapacity'),inputComponent("number","seatingCapacity",true))}
          {combinedComponent(titleComponent('Location'),inputComponent("text","location",true))}
          <p style={{fontSize:"15px",fontWeight:600,textDecoration:"underline", color:"blue"}} onClick={()=>makeJSONDownloadable(SAMPLE_SEAT_STRUCTURE,"sample_seat_structure")}>Download Sample Seat Structure</p>               
          <div className="flex flex-col justify-start gap-y-2 w-full">
            {titleComponent("SeatStructure")}
            <textarea value={formik.values["seatStructure"]} required onChange={formik.handleChange} style={{width:"full",padding:"5px",fontWeight:600,height:"200px",border:`1px solid ${colors.borderGrayVariant}}`}} name="seatStructure">

            </textarea>
          </div>
          {submissionError && <p style={{color:"red",fontSize:"15px",fontWeight:600}}>{submissionError}</p>} 
          <div className="flex flex-row items-center justify-center mt-5 w-full">
            <input type="submit" value="submit" className="rounded cursor-pointer" style={{border:"none",textTransform:"capitalize",padding:"5px 20px",background:"black",color:"white",fontSize:"15px",fontWeight:700}}/>                       
          </div>    
        </form>
      </div>
    </>
  )
}