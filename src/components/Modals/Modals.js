import { 
    sumbitConfirmNumber, submitCardCode,
    selectUserName, selectUserPhoneNumber, Stage,
    selectStage, selectShowModal, selectLoading, selectError,
    selectPreviousCardCode, logout, setLoading,
    selectPreviousFormUuid, selectFormData,
    fetchFormData, submitFormData, hideModal, showModal }
    from "../../features/sessionSlice"
import { useSelector, useDispatch } from "react-redux"
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
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)
    const stage = useSelector(selectStage)
    const modalShown = useSelector(selectShowModal)
    const userPhoneNumber = useSelector(selectUserPhoneNumber)
    const previousCardCode = useSelector(selectPreviousCardCode)

    const previousFormUuid = useSelector(selectPreviousFormUuid)
    const formData = useSelector(selectFormData)


    const dispatch = useDispatch();

    if (form_uuid && form_uuid !== previousFormUuid) {
        dispatch(fetchFormData(form_uuid))
    }
    
    const getFormByStage = () => {
        if (form_uuid && stage === Stage.SUCCESS) {
            console.log("!!!")
            return <FormTask
            onSubmit={(data) => dispatch(submitFormData(data))}
            onCancel={() => navigate("/")}
            {...formData}
            />
        }

        else if (form_uuid && stage == Stage.CONFIRM_NUMBER) {
            return <ConfirmNumber
                    displayPhoneNumber={userPhoneNumber}
                    maxLength={5}
                    timeout={90}
                    onSubmit={(confirmNumber) => dispatch(sumbitConfirmNumber(confirmNumber))}
                    onCancel={() => dispatch(logout())}
                    onRetry={() => dispatch(submitCardCode(previousCardCode))}/>
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
            
            case Stage.SUCCESS:
                return dispatch(hideModal())
            default:
                return <>!!!!</>
        }
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
                :<>
                    {
                        error ?
                            <SuccessOrFailReport fail 
                            label={error.error}/>
                        : undefined
                    }
                    {
                        getFormByStage()
                    }
                </>
            }
        </Modal>
        : undefined
            
                
}