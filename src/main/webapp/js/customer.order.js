function formateState (val) {
    if(val==0){
        return "未支付";
    }
    if(val==1){
        return "已支付";
    }
}
function formateOp(val, row) {
    return "<a href='javascript:openDetail();'>查看详情</a>"
}

function openDetail() {
    var rows = $('#dg').datagrid('getSelections');
    //console.log(rows);
    $('#fm').form('load',rows[0]);

    // 回显订单详情
    $('#dg2').datagrid({
        url: ctx+'/orderDetails/queryOrderDetailsByParams?orderId='+rows[0].id
    });
    openAddOrUpdateDlg('dlg','订单详情');
}