function formateState (val) {
    if(val==0){
        return "暂缓流失"
    }
    if(val==1){
        return "已流失"
    }
}

function formateOp (val, row) {
    if(row.state==0){
        return "<a href='javascript:;'>添加暂缓</a>"
    }
    if(row.state==1){
        return "确认流失"
    }
}