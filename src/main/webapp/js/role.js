// 清空表单
$(function () {
    $('#dlg').dialog({
        'onClose':function () {
            $('#fm').form('clear');
        }
    })
});


//添加
//添加[打开弹窗]
function openAddRoleDailog() {
    openAddOrUpdateDlg("dlg","添加角色")
}
//添加&更新[保存]
function saveOrUpdateRole() {
    saveOrUpdateData("fm",ctx+'/role/saveOrUpdateRole','dlg',queryRolesByParams)
}

//查询[搜索功能]
function queryRolesByParams() {
    $("#dg").datagrid('load',{
        roleName: $('#roleName').val(),
        createDate: $('#time').datebox("getValue")
    })
}

//更新
function openModifyRoleDialog () {
    openModifyDialog("dg","fm","dlg","更新角色");
}

//删除
function deleteRole () {
    deleteData("dg",ctx + "/role/deleteBatchRoles",queryRolesByParams)
}

//授权[打开弹窗]
function openRelationPermissionDialog () {
    // 获取勾选的条数
    var rows = $('#dg').datagrid('getSelections');
    // console.log(rows);
    if(rows.length<1){
        $.messager.alert('来自Crm',"请选择一条数据进行授权");
        return;
    }
    if(rows.length>1){
        $.messager.alert('来自Crm',"只能选择一条数据进行授权");
        return;
    }

    // 显示模块树
    initTree(rows[0].id);
    $('#permissionDlg').dialog('open');
}

var treeObj;

function initTree(roleId) {

    $('#roleId').val(roleId);

    $.ajax({
        url: ctx + "/module/queryAllModulesByRoleId?roleId="+roleId,
        success:function (data) {
            var setting = {
                check: {
                    enable: true,
                    chkboxType: { "Y" : "ps", "N" : "ps" }
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onCheck: zTreeOnCheck
                }
            };
            var zNodes = data;
            //console.log(zNodes);
            treeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        }
    })

}

function zTreeOnCheck() {
    var nodes = treeObj.getCheckedNodes(true);  //获取选中值
   //console.log(nodes);
    var moduleIds = '';
    for(var i=0;i<nodes.length;i++){
        moduleIds+='moduleIds='+nodes[i].id+"&";
    }
    //console.log(moduleIds);
    $('#moduleIds').val(moduleIds);  //写入隐藏域
}

function doGrant() {
    var roleId = $("#roleId").val();
    var moduleIds = $('#moduleIds').val();

    $.ajax({
        url: ctx + '/role/doGrant?roleId='+roleId+'&'+moduleIds,
        success:function (data) {
            if(data.code==200){
                $.messager.alert('来自Crm', data.msg, 'info',function () {
                    // 关闭弹窗
                    closeDlgData('permissionDlg');
                    // 清除隐藏域的值
                    $('#roleId,#moduleIds').val('');
                })
            }else{
                $.messager.alert('来自Crm', data.msg, 'error')
            }
        }
    })
}