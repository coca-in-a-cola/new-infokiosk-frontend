import { 
    sumbitConfirmNumber, submitCardCode,
    selectUserName, selectUserPhoneNumber, Stage,
    selectStage, selectShowModal, selectLoading, selectError,
    selectPreviousCardCode, logout, setLoading,
    selectPreviousFormUuid, selectFormData,
    fetchFormData, submitFormData, hideModal, startLogin,
    selectReportLarge, selectSuccess, showModal }
    from "../../features/sessionSlice"
import { useSelector, useDispatch } from "react-redux"
import { Button } from "../UI/Button"
import { Spinner } from "../UI/Spinner"
import { SuccessOrFailReport } from "../UI/SuccessOrFailReport"
import { ReadCard } from "./ReadCard"
import { ConfirmNumber } from "./ConfirmNumber"
import { Modal } from "./Modal"
import { FormTask } from "./FormTask"
import { AskLogin } from "./AskLogin"


export const Modals = ({form_uuid, navigate}) => {
    /* 
        Все модальные окна авторизации и отправки форм
    */

    const formatReport = (text) => {
        
    }
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)
    const stage = useSelector(selectStage)
    const modalShown = useSelector(selectShowModal)
    const userPhoneNumber = useSelector(selectUserPhoneNumber)
    const userName = useSelector(selectUserName)
    const previousCardCode = useSelector(selectPreviousCardCode)

    const previousFormUuid = useSelector(selectPreviousFormUuid)
    const formData = useSelector(selectFormData)

    const success = useSelector(selectSuccess)
    const reportLarge = useSelector(selectReportLarge)

    const dispatch = useDispatch();

    if (form_uuid && !modalShown) {
        dispatch(showModal())
    }
    
    const getFormByStage = () => {
        if (form_uuid) {
            switch (stage) {
                case Stage.UNAUTHORIZED:
                    return dispatch(startLogin())
                case Stage.READ_CARD:
                    return <ReadCard
                        onSubmit={(ssid) => dispatch(submitCardCode(ssid))}
                        onCancel={() => {dispatch(logout()); navigate("/")}}/>
                case Stage.CONFIRM_NUMBER:
                    return <ConfirmNumber
                    displayPhoneNumber={userPhoneNumber}
                    maxLength={5}
                    timeout={90}
                    onSubmit={(confirmNumber) => dispatch(sumbitConfirmNumber(confirmNumber))}
                    onCancel={() => {dispatch(logout()); navigate("/")}}
                    onRetry={() => dispatch(submitCardCode(previousCardCode))}/>
                case Stage.SUCCESS:
                    if (form_uuid !== previousFormUuid) {
                        dispatch(setLoading(true))
                        dispatch(fetchFormData(form_uuid))
                    }

                    return <FormTask
                    onSubmit={(data) => {dispatch(submitFormData(data)); navigate('/')}}
                    onCancel={() => navigate("/")}
                    {...formData}
                    />
            }
        }

        switch (stage) {
            case Stage.UNAUTHORIZED:
                return <AskLogin
                text="Чтобы продолжить, войдите в систему"
                
                onCancel={() => {navigate("/"); dispatch(logout())}}
                />
            case Stage.CONFIRM_NUMBER:
                return <ConfirmNumber
                    displayPhoneNumber={userPhoneNumber}
                    maxLength={5}
                    timeout={90}
                    onSubmit={(confirmNumber) => {dispatch(sumbitConfirmNumber(confirmNumber)); dispatch(hideModal())}}
                    onCancel={() => dispatch(logout())}
                    onRetry={() => dispatch(submitCardCode(previousCardCode))}/>
            case Stage.READ_CARD:
                return <ReadCard
                    onSubmit={(ssid) => dispatch(submitCardCode(ssid))}
                    onCancel={() => dispatch(logout())}/>
            
            default:
                return <></>
        }
    }

    const getReport = () => {
        const Wrap = ({children}) => {
            return reportLarge ?
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                {children}
            </div>
            : <>{children}</>
        }

        
        return <Wrap>
            <div>
        {
            error ?
                <SuccessOrFailReport fail 
                label={error.error || error.label}
                text={error.text}
                large={reportLarge} />
            : success ?
                <SuccessOrFailReport 
                label={success.label}
                text={success.text}
                large={reportLarge}/>
            : undefined
        }
        {
            reportLarge ?
            <div className="flex justify-between w-full max-w-5xl mx-auto">
                <Button className="w-80" onClick={() => dispatch(logout())} timeout={30}>ВЫХОД</Button>
                <Button className="w-80 bg-blue-darker" onClick={() => dispatch(hideModal())}>
                    ПРОДОЛЖИТЬ КАК {userName?.split(' ')[0]}
                </Button>
            </div>
            : undefined
        }
        </div>

        </Wrap>
    }

    
    return modalShown ?
        <Modal>
            {
                loading ?
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <Spinner>
                    Идёт загрузка формы...
                </Spinner>
                </div>
                : <>
                    {
                        getReport()
                    }
                    {
                        getFormByStage()
                    }
                </>
            }
        </Modal>
        : undefined
            
                
}