// 初始化 edataGrid  可以设置saveUrl,updateUrl,destroyUrl 属性来自动从客户端同步数据到服务器端
var sid = $('#saleChanceId').val();
$('#dg').edatagrid({
    url: ctx + '/cusDevPlan/queryCusDevPlansByParams?sid=' + sid,   /*查询*/
    saveUrl: ctx + '/cusDevPlan/saveOrUpdateCusDevPlan?saleChanceId='+sid,        /*添加保存[自动将数据发送到服务器,只用指明ID]*/
    updateUrl: ctx + '/cusDevPlan/saveOrUpdateCusDevPlan?saleChanceId='+sid      /*更新修改的保存*/
});

//前台添加
function addRow() {
    $('#dg').edatagrid("addRow")
}
//前台保存
function saveOrUpdateCusDevPlan() {
    $('#dg').edatagrid("saveRow")
}
//前台删除
function delCusDevPlan() {
    deleteData('dg',ctx + "/cusDevPlan/deleteBatchSaleChance",function () {
        $("#dg").edatagrid("load")
    })
}

//开发成功&终止开发
function updateSaleChanceDevResult(devResult) {
    $.ajax({
        url:ctx + "/saleChance/updateSaleChanceDevResult",
        type:'post',
        data:{
            id:sid,
            devResult:devResult
        },
        success:function (data) {
            if(data.code==200){
               $.messager.alert('来自Crm',data.msg,'info',function () {
                   //隐藏工具条
                    $('#toolbar').hide();
                   //表格不编辑
                   $('#dg').edatagrid('disableEditing')
               })

            }else{
                $.messager.alert("来自crm",data.msg,"error");
            }
        }
    })
}

//预加载判断开发状态
$(function () {
    var devResult = $('#devResult').val();
    if(devResult==2||devResult==3){
        //隐藏工具条
        $('#toolbar').hide();
        //表格不编辑
        $('#dg').edatagrid('disableEditing')
    }
})