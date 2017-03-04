angular.module('nutritionix.dialog.info', [ InfoDialog ]);

InfoDialog.$inject = [ '$mdDialogProvider' ];
function InfoDialog($mdDialogProvider) {
    $mdDialogProvider.addPreset('infoDialog', {
        options : function () {
            return {
                template            : '',
                controller          : InfoDialogController,
                templateUrl         : 'app/components/dialogs/itemInfo.tmpl.html',
                bindToController    : true,
                clickOutsideToClose : true,
                escapeToClose       : true,
                parent              : angular.element(document.body)
            };
        }
    });
}

InfoDialogController.$inject = [ '$scope', '$mdDialog', 'item' ];
function InfoDialogController($scope, $mdDialog, item) {
    
    // todo fetch more info about the item
    
    $scope.item   = item;
    $scope.hide   = $mdDialog.cancel;
    $scope.add    = function (ev) {
        $mdDialog.show(
            $mdDialog.quantityDialog({
                targetEvent : ev,
                locals      : {
                    item : item
                }
            })
        ).then(function (quantity) {
            console.log(quantity);
        });
    };
    $scope.cancel = $mdDialog.cancel;
    $scope.answer = $mdDialog.cancel;
}
