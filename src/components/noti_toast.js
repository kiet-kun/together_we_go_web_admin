const NotiToast = ({message, type}) => {
    return <>
        <div class={`toast align-items-center text-bg-${type}`} role="alert" aria-live="assertive" aria-atomic="true" 
        style={{display:'block', position: 'fixed', right: '12px', bottom : '12px'}}>
            <div class="d-flex">
                <div class="toast-body">
                {/* Hello, world! This is a toast message. */}
                {message}
                </div>
                {/* <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button> */}
            </div>
        </div>
    </>
}

export default NotiToast;