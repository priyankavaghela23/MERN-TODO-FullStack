import { useState } from 'react';
import '../styles/addtask.css'
import { useNavigate } from 'react-router-dom';
function AddTask(){
    const [taskData, setTaskData] = useState()
    const navigate = useNavigate()

    const handleAddTask = async () => {
        let result = await fetch("http://localhost:3200/add-task",{
            method:'post',
            body:JSON.stringify(taskData),
            headers:{
                'Content-Type': 'Application/Json'
            }
        })
        result = await result.json()
        if(result){
            navigate("/")
        console.log(taskData);
        }
        
    }
    return(
        <div className="container">
            <h1>Add New Task</h1>
            
                <label htmlFor="">Title</label>
                <input onChange={(event)=>setTaskData({...taskData,title:event.target.value})} type="text" placeholder="Enter Task Title" />

                <label htmlFor="">Description</label>
                <textarea onChange={(event)=>setTaskData({...taskData,description:event.target.value})} rows={4} name="description" placeholder="Enter Task Description"></textarea>

                <button onClick={handleAddTask} className="submit">Add Task</button>
           
        </div>
    )
}
export default AddTask;