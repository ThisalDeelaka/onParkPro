import { useEffect, useState} from 'react'
//components
import ServiceDetails from './ServiceDetails/ServiceDetails'



const Shome = () => {
    const[services, setWorkouts]=useState(null)


    useEffect(() => {
        const fetchServices = async () =>{
            const response = await fetch('/api/serviceBooking')
            const json = await response.json()

            if(response.ok){
               setWorkouts(json) 

            }
        }
        fetchServices()
    }, [])
    return(
        <div className="home">
            <div className="services">
                {services && services.map((service)=>(
                  <ServiceDetails key={service._id} service={service}/>

                ))}

            </div>
            
        </div>
    )
}

export default Shome