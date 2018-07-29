var path = require('path');

module.exports = {
    entry: [
        // '../front_end/templates/Scripts/lib/jquery.min.js',
        // '../front_end/templates/Scripts/lib/jquery-ui.min.js',
        // '../front_end/templates/Scripts/util/jquery.extension.js',
        // '../front_end/templates/Scripts/lib/moment.min.js',
        // '../front_end/templates/Scripts/lib/angular.min.js',
        // '../front_end/templates/Scripts/lib/angular-animate.min.js',
        // '../front_end/templates/Scripts/lib/angular-cookies.min.js',
        // '../front_end/templates/Scripts/lib/angular-sanitize.min.js',
        // '../front_end/templates/Scripts/lib/ol-debug.min.js',
        // '../front_end/templates/Scripts/lib/ol3/ol-format-Style.js',
        // '../front_end/templates/Scripts/lib/jsts.min.js',
        // '../front_end/templates/Scripts/lib/jantrik.crossDomainAjax.js',
        // '../front_end/templates/Scripts/util/errorMessageManager.js',
        // '../front_end/templates/Scripts/lib/underscore-min.js',
        '../front_end/templates/Scripts/util/appMessages.js',
        // '../front_end/templates/Scripts/lib/toastr.min.js',
        '../front_end/templates/Scripts/util/surfToastr.js',
        './.components/angularjs-slider/dist/rzslider.min.js',
        '../front_end/templates/Scripts/lib/colors.min.js',
        '../front_end/templates/Scripts/lib/bootstrap-colorpicker-module.js',
        '../front_end/templates/Scripts/lib/sortable.js',
        '../front_end/templates/Scripts/lib/jantrik/Jantrik.HandsOnTable.js',
        '../front_end/templates/Scripts/lib/Classifier/CheckBoxAllDirectives.js',
        '../front_end/templates/Scripts/lib/Classifier/ColorPaletteDirective.js',

        '../front_end/templates/Scripts/lib/ui-bootstrap-tpls-0.9.0.min.js',
        '../front_end/templates/Scripts/lib/jantrik/Jantrik.GIS.js',
        '../front_end/templates/Scripts/lib/jantrik/Jantrik.gradientGenerator.js',
        '../front_end/templates/Scripts/lib/csvParser.js',
        // '../front_end/templates/Scripts/lib/html2canvas.js',
        // '../front_end/templates/Scripts/lib/html2canvas.svg.js',
        '../front_end/templates/Scripts/lib/angular-dragdrop.js',
        '../front_end/templates/Scripts/lib/rgbcolor.js',

        '../front_end/templates/Scripts/Filters/appFilters.js',
        '../front_end/templates/Scripts/Filters/truncateFilter.js',
        '../front_end/templates/Scripts/Directives/appHelperModule.js',
        '../front_end/templates/Scripts/Directives/tableHeightAdjuster.js',
        '../front_end/templates/Scripts/Directives/TreeAngle.js',
        '../front_end/templates/Scripts/Directives/attributeDefinitionDirective.js',
        '../front_end/templates/Scripts/Directives/attributeGridDirective.js',
        '../front_end/templates/Scripts/Directives/classifierDefinitionDirective.js',
        '../front_end/templates/Scripts/Directives/labelingEditorDirective.js',
        '../front_end/templates/Scripts/Directives/visualizationEditorDirective.js',
        '../front_end/templates/Scripts/Directives/propertyGridDirective.js',
        '../front_end/templates/Scripts/Directives/datePicker.js',
        '../front_end/templates/Scripts/Directives/draggableDialogDirective.js',
        '../front_end/templates/Scripts/Directives/fileNameValidator.js',
        '../front_end/templates/Scripts/Directives/fixedNumberRange.js',
        '../front_end/templates/Scripts/Directives/fixedNumberRangeForClassifier.js',
        '../front_end/templates/Scripts/Directives/inputFocus.js',
        '../front_end/templates/Scripts/Directives/removeFocus.js',
        '../front_end/templates/Scripts/Directives/ngEnter.js',
        '../front_end/templates/Scripts/Directives/layerStyleEditor.js',
        '../front_end/templates/Scripts/Directives/styleEditor.js',
        '../front_end/templates/Scripts/Directives/stylePreview.js',
        '../front_end/templates/Scripts/Directives/stylePreviewSmall.js',
        '../front_end/templates/Scripts/Directives/Validation/colorCodeValidator.js',
        '../front_end/templates/Scripts/Directives/CsvFileImport/csvImporter.js',
        '../front_end/templates/Scripts/Directives/mapLegendDirective.js',
        '../front_end/templates/Scripts/Directives/resizer.js',
        '../front_end/templates/Scripts/Directives/hrefWatcher.js',
        '../front_end/templates/Scripts/Directives/visualizationLegends.js',
        '../front_end/templates/Scripts/Directives/printMapTilteOptions.js',
        '../front_end/templates/Scripts/Directives/minMaxValidator.js',
        '../front_end/templates/Scripts/Directives/QueryBuilder/queryBuilderDirective.js',

        '../front_end/templates/Scripts/util/Repository/RepositoryModule.js',
        '../front_end/templates/Scripts/util/Repository/urlResolver.js',
        '../front_end/templates/Scripts/util/Repository/MapRepository.js',
        '../front_end/templates/Scripts/util/Repository/LayerRepository.js',
        '../front_end/templates/Scripts/util/Repository/FeatureRepository.js',
        '../front_end/templates/Scripts/util/Repository/userProfileRepository.js',
        '../front_end/templates/Scripts/util/Repository/catalogRepository.js',

        '../front_end/templates/Scripts/util/Map/MapModule.js',

        '../front_end/templates/layers/js/layer.module.js',

        '../front_end/templates/Scripts/util/UserProfile/userProfileModule.js',

        '../front_end/templates/Scripts/util/jantrik.Event.js',

        './geonode/js/system-settings/system-settings.module.js',

        '../front_end/templates/Scripts/util/appModule.js',
        '../front_end/templates/Scripts/util/analyticsService.js',
        '../front_end/templates/maps/js/map.controller.js',
        '../front_end/templates/Scripts/util/sldTemplates.js',
        '../front_end/templates/Scripts/util/sldGenerator.js',
        '../front_end/templates/Scripts/util/Classifier/featureFilterGenerator.js',
        '../front_end/templates/Scripts/util/redoUndo.js',
        '../front_end/templates/Scripts/util/Classifier/ClassType.js',
        '../front_end/templates/Scripts/util/Classifier/ColorPaletteGenerator.js',
        '../front_end/templates/Scripts/util/Classifier/RangeCalculator.js',
        '../front_end/templates/Scripts/util/Classifier/RangeType.js',
        '../front_end/templates/Scripts/util/Classifier/UniqueType.js',
        '../front_end/templates/Scripts/util/busyStateManager.js',
        '../front_end/templates/Scripts/util/ProjectBrowser/publishMapDialogController.js',
        '../front_end/templates/Scripts/util/ProjectBrowser/projectService.js',
        '../front_end/templates/Scripts/util/attributeValidatorService.js',
        '../front_end/templates/Scripts/util/CatalogBrowser/catalogDataService.js',
        '../front_end/templates/Scripts/util/Browser.Shared/browser.helperService.js',
        '../front_end/templates/Scripts/util/Browser.Shared/fileBrowserController.js',
        '../front_end/templates/Scripts/util/CatalogBrowser/epsgService.js',
        '../front_end/templates/Scripts/util/CatalogBrowser/catalogBrowserController.js',
        '../front_end/templates/Scripts/util/ProjectBrowser/projectBrowserController.js',
        '../front_end/templates/Scripts/util/OverpassQueryBuilder/overpass-query-builder.controller.js',
        '../front_end/templates/Scripts/util/CatalogBrowser/uploadDataService.js',
        '../front_end/templates/Scripts/util/CatalogBrowser/uploadDataController.js',
        '../front_end/templates/Scripts/util/CatalogBrowser/shareDataController.js',
        '../front_end/templates/Scripts/util/CatalogBrowser/csvHeaderMappingService.js',
        '../front_end/templates/Scripts/util/CatalogBrowser/csvHeaderMappingController.js',
        '../front_end/templates/Scripts/util/CatalogBrowser/selectEpsgCodeController.js',
        '../front_end/templates/Scripts/util/AttributeGrid/attributeGridService.js',
        '../front_end/templates/Scripts/util/AttributeGrid/attributeGridController.js',
        '../front_end/templates/Scripts/util/CSVEditor/CSVEditorService.js',
        '../front_end/templates/Scripts/util/CSVEditor/CSVEditorController.js',
        '../front_end/templates/Scripts/util/cookieManager.js',
        '../front_end/templates/Scripts/util/maintenanceMessageManager.js',
        '../front_end/templates/Scripts/util/singnalRManager.js',
        
        
        '../front_end/templates/Scripts/util/Map/featureService.js',
        '../front_end/templates/Scripts/util/Map/dataService.js',
        '../front_end/templates/Scripts/util/Map/utilityService.js',
        '../front_end/templates/Scripts/util/Visualization/visualizationService.js',
        '../front_end/templates/Scripts/util/Map/layerService.js',
        '../front_end/templates/Scripts/util/Map/mapService.js',
        '../front_end/templates/Scripts/util/Tree/treeController.js',
        '../front_end/templates/Scripts/util/Tree/layerPropertiesController.js',
        '../front_end/templates/Scripts/util/Tree/blankLayerController.js',
        '../front_end/templates/Scripts/util/Subscription/SubscriptionStatus.js',
        '../front_end/templates/Scripts/util/ImageAttach/imageAttachController.js',
        '../front_end/templates/Scripts/util/ImageAttach/imagePreviewController.js',
        '../front_end/templates/Scripts/util/ImageAttach/fileAttachController.js',
        '../front_end/templates/Scripts/util/ImageAttach/largeImageViewController.js',
        '../front_end/templates/Scripts/util/Visualization/visualizationController.js',
        '../front_end/templates/Scripts/util/controlButtonsController.js',
        '../front_end/templates/Scripts/util/jantrik.EventPool.js',
        '../front_end/templates/Scripts/util/Map/Feature/surfFeature.js',
        '../front_end/templates/Scripts/util/Map/Feature/surfFeatureFactory.js',
        '../front_end/templates/Scripts/util/Map/Layer/nullSurfLayer.js',
        '../front_end/templates/Scripts/util/Map/Layer/sourceLessSurfLayer.js',
        '../front_end/templates/Scripts/util/Map/Layer/surfLayerBase.js',
        '../front_end/templates/Scripts/util/Map/Layer/wmsSurfLayer.js',
        '../front_end/templates/Scripts/util/Map/Layer/surfLayerFactory.js',

        '../front_end/templates/Scripts/util/Map/LayerRenderingMode/layerRenderingModeFactory.js',
        '../front_end/templates/Scripts/util/Map/LayerRenderingMode/nullRenderingMode.js',
        '../front_end/templates/Scripts/util/Map/LayerRenderingMode/simpleWmsRenderingMode.js',

        '../front_end/templates/Scripts/util/Map/interactionHandler.js',
        '../front_end/templates/Scripts/util/Map/surfMap.js',
        '../front_end/templates/Scripts/util/Map/onZoomHandler.js',

        '../front_end/templates/Scripts/util/Print/printPreviewController.js',
        '../front_end/templates/Scripts/util/Tools/Layer/clearFeaturesTool.js',
        '../front_end/templates/Scripts/util/Tools/Layer/createFeatureTool.js',
        '../front_end/templates/Scripts/util/Tools/Layer/wmsSelectionDisplayTool.js',
        '../front_end/templates/Scripts/util/Tools/Layer/wmsSelectFeatureTool.js',
        '../front_end/templates/Scripts/util/Tools/Layer/wmsDeleteFeatureTool.js',
        '../front_end/templates/Scripts/util/Tools/Layer/wmsEditFeatureTool.js',
        '../front_end/templates/Scripts/util/Tools/Layer/redoUndoTool.js',
        '../front_end/templates/Scripts/util/Tools/Layer/locationCaptureTool.js',
        '../front_end/templates/Scripts/util/Tools/Layer/attributeDisplayTool.js',
        '../front_end/templates/Scripts/util/Tools/Layer/wmsMultiSelectFeatureTool.js',


        '../front_end/templates/Scripts/util/Tools/Map/locationSearchTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/geoLocationTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/activeLayerTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/allSelectableLayerTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/zoomTrackerTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/zoomToLayerTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/baseMapTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/navigationHistoryTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/mapToolsFactory.js',
        '../front_end/templates/Scripts/util/Tools/Map/mapTools.js',
        '../front_end/templates/Scripts/util/Tools/Map/zoomInOutTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/zoomToMaxExtentTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/zoomToExtentTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/measurementTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/setMarkerTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/boxDrawTool.js',
        '../front_end/templates/Scripts/util/Tools/Map/circleDrawTools.js',

        '../front_end/templates/Scripts/util/Tools/UI/featureEditButtonsDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/featureRedoUndoButtonsDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/mapLoadingIconDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/zoomLevelDisplayDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/baseMapSwitcherDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/locationSearchDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/geoLocationToggleButtonDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/editToggleButtonDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/locationCaptureButtonsDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/navigationHistoryButtonsDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/propertyGridOverlayDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/zoomInOutButtonDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/zoomToMaxExtentButtonDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/zoomToExtentButtonDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/measurementButtonsDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/setMarkerButtonDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/routePopUpDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/cursorToolTipDirective.js',
        '../front_end/templates/Scripts/util/Tools/UI/nearestRouteConfigurationDirective.js',
        '../front_end/templates/layers/js/layer.service.js',
        '../front_end/templates/layers/js/attribute-view.controller.js',
        '../front_end/templates/layers/js/feature-preview.controller.js',
        '../front_end/templates/layers/js/layers-save.controller.js',

        './geonode/js/system-settings/system-settings.service.js',

        '../front_end/templates/maps/js/share-map.controller.js',
        '../front_end/templates/Scripts/Directives/printPreviewDirective.js',
    ],
    mode: 'none',
    output: {
        filename: 'streamstech.bundle.js',
        path: path.resolve(__dirname, 'lib/dist')
    }
}