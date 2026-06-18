import { useEffect, useState } from 'react';
import '../styles/addtask.css'
import { useNavigate, useParams } from 'react-router-dom';
export default function UpdateTask(){

    const [taskData, setTaskData] = useState()
    const navigate = useNavigate()


    const {id} = useParams()
    console.log(id);
    
    
    useEffect(()=>{
        getTask(id)
    },[])

    const getTask = async(id) => {
        let task = await fetch(`http://localhost:3200/task/${id}`,{
             credentials:'include',
        })
        task = await task.json()
        if(task.result){
            setTaskData(task.result)
        }
    }
    const updateTask = async () => {
            console.log("Function Call",taskData);
            let task = await fetch('http://localhost:3200/update-tasks',{
                method: 'put',
                credentials:'include',
                body: JSON.stringify(taskData),
                headers: {
                'Content-Type': 'Application/json'
                }
            })

            task = await task.json()
            if(task){
                navigate("/")
            }
            
        }
    return(
        <div className='container'>
            <h1>Update Task</h1>

            <label htmlFor="">Title</label>
            <input value={taskData?.title} onChange={(event)=>setTaskData({...taskData,title:event.target.value})} type="text"/>

            <label htmlFor="">Description</label>
            <textarea value={taskData?.description} onChange={(event)=>setTaskData({...taskData,description:event.target.value})} rows={4} name="description" placeholder="Enter Task Description"></textarea>

            <button onClick={updateTask}>Update Task</button>
        </div>
    )
}