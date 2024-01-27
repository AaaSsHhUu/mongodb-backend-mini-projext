function confirmDelete(){
    let confirmDelete = confirm("Do you want to Delete this ?");

    if(confirmDelete){
       document.getElementById("deleteForm").submit();
    }
}