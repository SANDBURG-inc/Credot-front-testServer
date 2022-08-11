import AuthWrapper from '../components/auth/AuthWrapper';
import Form from 'react-bootstrap/Form';
import AuthButton from './../components/auth/AuthButton';
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from 'react-router-dom';
import { update } from "./../redux/store.js"

const Mypage = () => {
    let a = useSelector((state) => state.login);
    let tmpName = useSelector((state) => state.info.name);
    let tmpEmail = useSelector((state) => state.info.email);
    let tmpPhoneNum = useSelector((state) => state.info.phoneNum);
    let tmpBank = useSelector((state) => state.info.bank);
    let tmpAccount = useSelector((state) => state.info.account);
    const dispatch = useDispatch();
    if (a === false) {
        console.log("로그인 안됌");
        return (
            <Navigate to="/" />
        );
    }
    return(
      <AuthWrapper>
          <Form.Group>
              <Form.Label>성함</Form.Label>
              <Form.Control style={{margin: "10px 0px 50px 0px"}} placeholder={tmpName} disabled />
              <Form.Label>이메일</Form.Label>
              <Form.Control style={{margin: "10px 0px 50px 0px"}} placeholder={tmpEmail} disabled />
              <Form.Label>연락처</Form.Label>
              <Form.Control style={{margin: "10px 0px 50px 0px"}} placeholder={tmpPhoneNum} disabled />
              <Form.Label style={{margin: "10px 0px 10px 0px"}}>계좌정보</Form.Label>
              <Form.Control style={{margin: "10px 0px 10px 0px"}} placeholder={tmpBank} disabled />
              <Form.Control style={{margin: "10px 0px 50px 0px"}} placeholder={tmpAccount} disabled />
              <Form.Label>비밀번호</Form.Label>
              <Form.Control style={{margin: "10px 0px 25px 0px"}} placeholder="현재 비밀번호" />
              <Form.Control style={{margin: "10px 0px 10px 0px"}} placeholder="새 비밀번호" />
              <Form.Control style={{margin: "10px 0px 10px 0px"}} placeholder="새 비밀번호 확인" />
              <AuthButton onClick={async()=>{
                // await fetch('http://localhost:9000/database/changepw?currentid=<redux현재id>&currentpw=<redux현재pw>&futurepw=<바꾸고싶은 pw>');
              }}>비밀번호 수정</AuthButton>
              <AuthButton onClick={async()=>{
                await fetch('http://localhost:9000/logout');
                dispatch(update());
                localStorage.clear();
                alert("로그아웃 되었습니다");
              }}>로그아웃</AuthButton>
          </Form.Group>
      </AuthWrapper>
    )
}

export default Mypage;
