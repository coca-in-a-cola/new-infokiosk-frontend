import { 
    sumbitConfirmNumber, submitCardCode,
    selectUserName, selectUserPhoneNumber, Stage,
    selectStage, selectShowModal, selectLoading, selectError }
    from "../../features/sessionSlice"
import { useSelector, useDispatch } from "react-redux"
import { Spinner } from "../UI/Spinner"
import { SuccessOrFailReport } from "../UI/SuccessOrFailReport"
import { ReadCard } from "./ReadCard"
import { ConfirmNumber } from "./ConfirmNumber"


export const Modals = () => {
    /* 
        Все модальные окна авторизации и отправки форм
    */

    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)
    const stage = useSelector(selectStage)
    const showModal = useSelector(selectShowModal)

    const dispatch = useDispatch();

    const getFormByStage = () => {
        switch (stage) {
            case Stage.CONFIRM_NUMBER:
                return <ConfirmNumber
                    maxLength={5}
                    timeout={90}
                    onSubmit={(confirmNumber) => dispatch(sumbitConfirmNumber(confirmNumber))}
                    onCancel={() => {}}/>
            case Stage.READ_CARD:
                return <ReadCard
                    onSubmit={(ssid) => dispatch(submitCardCode(ssid))}
                    onCancel={() => {}}/>

            default:
                return <>!!!!</>
        }
    }

    
    return !showModal ?
        <></>
        : loading ?
            <Spinner>
                Идёт загрузка формы...
            </Spinner>
            : error ?
                <SuccessOrFailReport fail 
                label="Произошла ошибка при загрузке формы" 
                text={error}/>
                : getFormByStage()
}