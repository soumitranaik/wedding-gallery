"use client"

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import LightGallery from 'lightgallery/react';
import { LightGallery as ILightGallery } from 'lightgallery/lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

const imageIds = [
    '1fXRVIgoSxvHqWbHdP7osLylPG1aXmwF8',
'1ecP9SExxZLb3-3jQy3Y_QNirXSG3SqWO',
'16IRnuPJMAXt5y-oET-Un_62HsDXny7ie',
'1D5CSiTwBcuaVzGawt6lrJYWQX0yLzGhN',
'1Tf6olVVGK4eM07yqkgb0s3Mg8JYw_Obm',
'12IFpkP8VukARo8V3bt7EnlhCfTSmeNJx',
'1eZ1N_jkNys5PIeHAjUANaxy9VPkHC7Gx',
'1gzAn_w30z3pozS6KZNWLengzPUmaVopo',
'1gcuWidnkt46Z8JgQRkMDeGpb8ZOFlRMK',
'1dRpk0uyI-nHUweVlwC9B692aHpz6rowp',
'1wkXMp3CQ2-iH6GO5k79xw16phwEBGoe1',
'1mwO_Qq6RhwUHZQFNr20ww8YMLFNl8ngR',
'1soveTxYyzDdHoV83SW_Kb-XNtHzWtqM8',
'1GoKpOCZog_iUxeGwe-ADeGxFHHjVCjOL',
'1jz6Ppq3RAUSNabwl-lxeL0zNWADG4nDT',
'1BoXHgDtkEAcmgUU8m15g82Wj_uhzdA-s',
'17mpYNPcS_LNTaZ_dpkC3VC5j7mKtjgcv',
'1sm_PTJ6eJaZkLPxECYDnGImVxcFxuPvN',
'1_RjMT3Rqf_Z_EpomGEnJszzoUTFrRNNN',
'1YILqH3TjbqOlRcZRy__XJ661oA2Qb595',
'1cixBNIvR4BWDEljIc8GLYBNwKism9rPQ',
'1JQuschfna1fKCqBT54Jqr9FkwKDJFCr8',
'1so-UCZtQSKdFAM32O4tsfRnfQPATzBRf',
'1UdyJAt0gWeZfxXh30QtH4pcjRI13qV6r',
'1sJbyp6vVDQ36ZmWO_iQoruSwncW_ei7E',
'1W-xofxNLwTkvzjD8bdJuL25l3wJ46q3A',
'1UQts6YxBNDCuUODuMdRLUl0-3N4gQJGQ',
'16pkl8vmq0ussRP9tVH4JFGL_iQtplpPc',
'1CEin-on80ZwxtUdUUek0yc2U4DQrl1Bl',
'1zP9VuZlvqWA3shoz5ywv7a-wwiXMQVnR',
'1i2gShB1xRiCxa_o87-k-EyRCmVMURtc1',
'1lC2r4mvHc0kEvgful4u0kKRhgxi81g8k',
'1YTxoODYk0M1bKDf76NAiRldFf_0l8a9_',
'1Eh_OXIZZULC4GZbC3mESU-FhDr1JAOmq',
'10Dpn98qXlFo93jNDgHBUZ6yXdxwEDg_g',
'1ZM2N1jXW5gFqt-suteHoE8PVOFZLwT-D',
'1vSUrhvhLQ1g2brzJObdz3Unknjc9LjJ0',
'1R9b62_KWZNmOG9RRFFYR2eaO9OrQ__qm',
'1uYOhiJEWgImACZP1RiFb-nOrtjIUam5g',
'1y9WkOb6dPQmstajcbUJ5LTTTmVs2szGS',
'1HceCIy8HkIE63pgRa1PCDdaclKGF08d7',
'1V-GE2GaLwa5QSArzPiIIFWhhUrDOQWh2',
'16S9Ch0NfU1m3V_LrMdMkUS4oWGtbYcGf',
'1tGK7agZ1wGnB54ZN79GKiJxgj4Jj7oUe',
'1EMTeWd33mE3UZ2JTX9dIsIhOywqbgZ2E',
'1Wznh8rrlZvwUKKYX_B8s0-HhqEp9e_5g',
'1sXj2GfDvwwh3WImQcWo-IpqGZgm-AoAt',
'1D2HTv6v-Qu1oliwj5mJPWf5Rv1Ap7Dec',
'1K0wvD-ARORv3pKWZOX3qcNfWjmhFWaNV',
'1QUFXNElHgu1sYbGg01J1jhTdUjULCxkj',
'1DXVorqq8F_9xe6giIkZ5FbKtlPnv_RkH',
'1ePZZCeQX9sqUiItKInPBOkMkm-WKhV-n',
'12gbaHRJBHPJZLI-4q_w2XXmlxU6yqoMH',
'18DN9eaiXDr2lbknBCV0aHDcfxbjqSUA_',
'1oEhCHF3p5nOc_1Wt6T8whnDfYdPFavw0',
'14RjwO7UL8QH_Jr71aeRGSTB9q8pWncFC',
'1uLMUD1cXUuJnss9a0jJhbNEdgwmnOd9n',
'1MCQ_lVzQ_nTQcZmdI-ajWadDnUvI8Mqo',
'1Q78yX-X2u0t1DhsqKc4v6xLzkM1_--P_',
'1Wu-zhh81_OCmMB_0ec4nXCM3iBvVxheO',
'128x587-XXR6hn39-mqE-Q8w4eK-JkBwY',
'1NciiCZ1lT4w2Um2l3H0epST2Smx0A6jZ',
'13ugMXIbTZl40-K1W4yQimiAp7dC4SGNB',
'1rOF8MPa7gMqwjBCQSZQWjAWoFUORe2q4',
'1X6Dix7j0HZNhwJ2-vNwZen9TDAL4ehOP',
'1vwCrTpJZpSNfPV7ccGwDvCyrmxH1yKFM',
'1W7YP-bT-iFFb2yOEPq6xqHRMrMyebPUd',
'1AzDiiWaQSZoNmzLZCoiVFlRDICW6wTp4',
'1lUQNGVkEVxBvOXktIqO8dmnZJRP6vG4w',
'1kW4B7npvP1qGzUOY7NkvbTd1V6Tan3Us',
'1wQaOW-LG4DbdzVQkzJ-4Nic8qZGVpuaB',
'1uog7LG-5QncuUDDrSaiCxwRMJsAduEEM',
'1p3TROZeU5xTjTeV7RE7M7oyEVATNmUyi',
'1b9Qcm-rPEV9WNtj3xdVutR782M2P5X3R',
'1vOD1uLMDfeyEEoF34PmgP0Or7tWV-pdv',
'1Q-jubu7D6dgoUBOdLVTVnmd5hUX0nQOS',
'1lxIuKiUTc5tZxF1c24zrdh_AHQPYzsHO',
'1yytsbRK4OSmbH9_9yUqOXy8ashqkZ4_x',
'1Khb1FbseewRokQeGRIkGID5lAB8XOaqn',
'1EgOqrt0IGwgyoFmJ2ZDYy3ftvuQAfuSb',
'11GIWyP2q28jPHgQ_LJ9blNmYnpUB1PTj',
'1Pv68PiUuqI8Fjryi2DXDGk2YdsCsCf5H',
'1BVS6HIJ5w-YfhXyyumL7ncicx2aOiAJV',
'1vKv23u9_4m1Y0zYzZ9rQtqI2yWGu6FdF',
'1q940-7Lks4vvUtPM7T1nhc_QzKXkuySg',
'1Z3UdkJcku58YbD2iQj-yV5OOnVUUcnAA',
'17slEL-uEzDd5fT6qUxs2XQUEG4CMX4DA',
'1w_eEdPh1nL5tmy_PC6P4ZS4o6MhgNgKv'

];

const generateDynamicEl = (ids: string[]) => {
    return ids.map(id => ({
        src: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
        responsive: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
        thumb: `https://drive.google.com/thumbnail?id=${id}&sz=w100`,
        subHtml: `Image ${id}`,
    }));
};

export const Mehendi: FC = () => {
    const lightGalleryRef = useRef<ILightGallery | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [galleryContainer, setGalleryContainer] = useState<HTMLDivElement | null>(null);

    const onInit = useCallback((detail: { instance: ILightGallery }) => {
        if (detail) {
            lightGalleryRef.current = detail.instance;
            lightGalleryRef.current.openGallery();
        }
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            setGalleryContainer(containerRef.current);
        }
    }, []);

    return (
        <div className="App">
            <div style={{ height: '800px' }} ref={containerRef}></div>
            <LightGallery
                container={galleryContainer || undefined}
                onInit={onInit}
                plugins={[lgZoom, lgThumbnail]}
                dynamic={true}
                dynamicEl={generateDynamicEl(imageIds)}
            />
        </div>
    );
};

export default Mehendi;
