import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon';
import { icon as EuiIconArrowUp } from '@elastic/eui/es/components/icon/assets/arrow_down';
import { icon as EuiIconArrowDown } from '@elastic/eui/es/components/icon/assets/arrow_up';
import { icon as EuiIconArrowLeft } from '@elastic/eui/es/components/icon/assets/arrow_left';
import { icon as EuiIconArrowRight } from '@elastic/eui/es/components/icon/assets/arrow_right';
import { icon as EuiIconLogo } from '@elastic/eui/es/components/icon/assets/logo_elastic';
import { icon as EuiIconEmail } from '@elastic/eui/es/components/icon/assets/email';
import { icon as EuiIconPencil } from '@elastic/eui/es/components/icon/assets/pencil';
import { icon as EuiIconFolderClosed } from '@elastic/eui/es/components/icon/assets/folder_closed';
import { icon as EuiIconFolderOpen } from '@elastic/eui/es/components/icon/assets/folder_open';
import { icon as EuiIconHelp } from '@elastic/eui/es/components/icon/assets/help';
import { icon as EuiIconDocument } from '@elastic/eui/es/components/icon/assets/document';
import { icon as EuiIconTokenConstant } from '@elastic/eui/es/components/icon/assets/tokenConstant';
import { icon as EuiIconTokenEnum } from '@elastic/eui/es/components/icon/assets/tokenEnum';
import { icon as EuiIconLogoBeats } from '@elastic/eui/es/components/icon/assets/logo_beats';
import { icon as EuiIconExternalLink } from '@elastic/eui/es/components/icon/assets/popout';
import { icon as EuiIconApps } from '@elastic/eui/es/components/icon/assets/apps';
import { icon as EuiIconHome } from '@elastic/eui/es/components/icon/assets/home';
import { icon as EuiIconSave } from '@elastic/eui/es/components/icon/assets/save';
import { icon as EuiIconStats } from '@elastic/eui/es/components/icon/assets/stats';
import { icon as EuiIconVisAreaStacked } from '@elastic/eui/es/components/icon/assets/vis_area_stacked';
import { icon as EuiIconVisBarHorizontal } from '@elastic/eui/es/components/icon/assets/vis_bar_horizontal';
import { icon as EuiIconDownload } from '@elastic/eui/es/components/icon/assets/download';
import { icon as EuiIconClock } from '@elastic/eui/es/components/icon/assets/clock';
import { icon as EuiIconTableDensityExpanded } from '@elastic/eui/es/components/icon/assets/table_density_expanded';
import { icon as EuiIconBeaker } from '@elastic/eui/es/components/icon/assets/beaker';
import { icon as EuiIconCheer } from '@elastic/eui/es/components/icon/assets/cheer';
import { icon as EuiIconSketch } from '@elastic/eui/es/components/icon/assets/logo_sketch';
import { icon as EuiIconEmpty } from '@elastic/eui/es/components/icon/assets/empty';
import { icon as EuiIconCheck } from '@elastic/eui/es/components/icon/assets/check';
import { icon as EuiIconAlert } from '@elastic/eui/es/components/icon/assets/alert';
import { icon as EuiIconAddDataApp } from '@elastic/eui/es/components/icon/assets/app_add_data';
import { icon as EuiIconDiscoverApp } from '@elastic/eui/es/components/icon/assets/app_discover';
import { icon as EuiIconPlay } from '@elastic/eui/es/components/icon/assets/play';
import { icon as EuiIconPlayFilled } from '@elastic/eui/es/components/icon/assets/playFilled';
import { icon as EuiIconVideoPlayer } from '@elastic/eui/es/components/icon/assets/videoPlayer';


// One or more icons are passed in as an object of iconKey (string): IconComponent
export const useIcon = () => {
    return appendIconComponentCache({
        arrowUp: EuiIconArrowUp,
        arrowDown: EuiIconArrowDown,
        arrowLeft: EuiIconArrowLeft,
        arrowRight: EuiIconArrowRight,
        logoElastic: EuiIconLogo,
        email: EuiIconEmail,
        pencil: EuiIconPencil,
        folderClosed: EuiIconFolderClosed,
        folderOpen: EuiIconFolderOpen,
        help: EuiIconHelp,
        document: EuiIconDocument,
        tokenConstant: EuiIconTokenConstant,
        tokenEnum: EuiIconTokenEnum,
        logoBeats: EuiIconLogoBeats,
        popout: EuiIconExternalLink,
        apps: EuiIconApps,
        home: EuiIconHome,
        save: EuiIconSave,
        stats: EuiIconStats,
        visAreaStacked: EuiIconVisAreaStacked,
        visBarHorizontal: EuiIconVisBarHorizontal,
        download: EuiIconDownload,
        clock: EuiIconClock,
        tableDensityExpanded: EuiIconTableDensityExpanded,
        beaker: EuiIconBeaker,
        cheer: EuiIconCheer,
        logoSketch: EuiIconSketch,
        empty: EuiIconEmpty,
        check: EuiIconCheck,
        alert: EuiIconAlert,
        addDataApp: EuiIconAddDataApp,
        play: EuiIconPlay,
        playFilled: EuiIconPlayFilled,
        discoverApp: EuiIconDiscoverApp,
        videoPlayer: EuiIconVideoPlayer,
    });
}