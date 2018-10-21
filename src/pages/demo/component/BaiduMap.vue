<!-- Created by henian.xu on 2018/9/10. -->

<template>
    <page>
        <div 
            class="body" 
            slot="body">
            <div class="map-wrap">
                <baidu-map
                    class="map"
                    :style="mapStyle"
                    :center="{lng: 116.404, lat: 39.915}"
                    :zoom="8"
                    :scroll-wheel-zoom="true">
                    <bm-geolocation
                        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                        :show-address-bar="true"
                        :auto-location="true"/>
                </baidu-map>
            </div>
        </div>
    </page>
</template>

<script>
export default {
    name: 'BaiduMapPage',
    data: function() {
        return {};
    },
    computed: {
        mapStyle() {
            return {
                width: '100%',
                height: '100%',
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.map-wrap {
    position: relative;
    flex: 1 1 1%;
    min-height: 100%;
    > .map {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
}
.page {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    > .body {
        flex: 1 1 1%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
    }
}
</style>
