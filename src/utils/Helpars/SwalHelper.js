import Swal from "sweetalert2";
export let isLoading = false;


export function loading(title='Loading...', text='Please Wait', timer=20000)
{
    if(isLoading) return;
    Swal.fire({
        imageUrl: '../../images/loading.gif',
        imageWidth: 75,
        title: title,
        text: text,
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: timer,
        showCloseButton: false,
        showLoading: true,
        showConfirmButton: false,
    })
}

export function close()
{
    Swal.close();
    isLoading = false;
}

export function success(title="Success", text="Successfully Processed")
{
    isLoading = false;
    Swal.fire({
        icon: 'success',
        title: title,
        type: 'success',
        text: text,
    });
}

export function error(title="Oops...", text="Got Error While Processing")
{
    isLoading = false;
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
    })
}

export function confirm(message="Are you sure?", text="Are you sure about current action?")
{
    return Swal.fire({
        title: message,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    })
}