
function PlateNoPass(){
    
    return(

        <>
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex justify-center items-center mb-20">
            <i className="fa-solid fa-circle-xmark text-[350px] text-red-500"></i>
          </div>
            <h1 className="text-center font-medium text-[45px]">Your license plate is not in the database.</h1>
        </div>
        </>
        
    )
}

export default PlateNoPass
