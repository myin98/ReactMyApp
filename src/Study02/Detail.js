import { useEffect, useState } from 'react';
import { json, useParams} from 'react-router-dom';
const Detail = () => {
    const { id } = useParams();
    const [array, setArray] = useState([]);
    const [data, setData] = useState({id: 0, title: '', content: ''});
    
    useEffect(()=>{
        const resultString = localStorage.getItem('data');
        const result = JSON.parse(resultString);
        setArray(result);
    },[]); //[] 빈 배열일 경우 1회 실행

    useEffect(() => {
        array.forEach(row => {
            if(row.id === Number(id) ){
                setData(row);
            }
        });
    }, [array]); // 상태값 array가 값이 변경 되었을 경우 실행 


    const submitEvent = e => {
        e.preventDefault();
        //수정된 내용을 배열에 넣기 위해서 빈 배열 처리
        let newArray = [];
        array.forEach(row => {
            if(row.id !== Number(id)){
                // 수정 중인 id가 아닌 경우는 기존 데이터 넣기
                newArray = [...newArray, row];
            } else {
                // 수정 대상인 id는 상태값으로 교체
                newArray = [...newArray, data];
            }
        });
        // 변경된 배열 다시 저장
        setArray(newArray)
        localStorage.setItem('data', JSON.stringify(newArray));
    }
    const deleteEvent = () => {
       let newArray = [];
       array.forEach(row => {
        if( row.id !== Number(id) ) {
            // 삭제 대상 id가 아닌 경우는 기존 데이터 넣기
            newArray = [...newArray, row];
        }
       });
       //변경된 배열 다시 저장
       setArray(newArray);
       localStorage.setItem('data', JSON.stringify(newArray));
    }
 //   let title = "제목";
 //   let content = "글 내용";
    const handlechange = (event) => {
        const {name, value} = event.target;
       setData({...data, [name]:value});
    };

    return (
        <>
            <div className="container" style={{'marginTop': '80px'}}>
                <h2 className="text-center">작성 내용</h2>
            </div>
            <div className="container mt-3">
                <form onSubmit={submitEvent}>
                    <input type="text" className="form-control" name="title" value={data.title} onChange={handlechange} placeholder="글을 작성하세요." />
                    <div className="mb-3 mt-3">
                        <label htmlFor="board_content">작성글 내용:</label>
                        <textarea type="text" className="form-control" rows="5" name="content" value={data.content} onChange={handlechange} style={{resize: 'none'}}></textarea>
                    </div>
                    <div className="btn-group">
                        <button type="submit" className="btn btn-info" >수정</button>
                        <button type="button" className="btn btn-danger" onClick={deleteEvent}>삭제</button>
                        <a className="btn btn-primary" href="/">목록</a>
                    </div>
                </form>
            </div>
        </>
    );
}
export default Detail;