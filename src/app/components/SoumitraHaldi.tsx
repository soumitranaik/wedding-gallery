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
'1G-KHRaVvwAPVAZMUEJBITZ8R_lxVxI6k',
'1vbnfxB_K2mlRIqgLFZpAITnxs1P3grdP',
'13rQOjMLm7aR3nyDD42AB6JDfdLD7wrWR',
'1WF1FxdgvTJmpmb3NUrtT3Q24nIwFuVgM',
'1HLF8pNMNXQJwBV11Vc3l2vq7Sh9B7eVp',
'19dzks9CM2g2m9Fi-00h-CKXbq1gXPcXY',
'1y1pB_KQ2K3_qLve9oOxwCINpn7C-4RVf',
'1nAXM-yifRl-DgNfDlkir1a9pXv0xwgti',
'1gmkUFXyI5j6_Cq3fdW7_-tgeTmMFt1aM',
'1C-FVn6bsOBxHilWc06ubHyr15TqUPFub',
'12qtgfSxoa3A9aC1iVruGd9y_MnklLzXC',
'15G0gwuSilbnsE56SiTMUgRZWPnM9kNV-',
'1uDcImE5miRZbJfFly5YsRnbpiS9yZs7Y',
'1qe0rsobdJpmbvoApC6aAbZ2PafxgyNBs',
'1EeAhxPGLFJvG4Cbr0LMeag88VwxPlvSa',
'1JFlaSO0vmon9NEXzb5mPIlKSDqqOfIum',
'1aULSyOGvDDMiswQjoKIXC_Sial3_6aMn',
'10BPAVXlLy_renfmqRAiK6_cu3Y1GpE7u',
'1hPFAXJQsrLu4RQ9OA2dPgQMRTSEasOee',
'1p6NucYefR0Fv09IPKspWb8D5k92hGvg2',
'1dkewZXJxdfxE7elryG-Kuxt3UjOHtegu',
'1LjUxLJQQ1rDuaieFlh9Ew4Q-BoQLuLwY',
'10H8HYGtSqU8XdckZLomrDpYRGjRZ-nxk',
'1E1jtAYgIrAoNN62rt5N9Tg7pZnDgOWc9',
'1t51vV2P4SiRBDBCx2-6g7VtGw_abG84A',
'1GvJy0FpApFyeDdiEcGi9IliVckZiZHX_',
'10bRJGtJ4fbLuabJvMWs8lEk0xfcR4Gpb',
'1wd-z0xqAXzQV6P6mXNl-cZYZFzMcV0sv',
'1gLDzFn9cXOY9pEIi0ZFDrrzEKHxnDtQ4',
'1qghGXyYzARG4JxArLdKC2CH8ZDWau1AS',
'1Q_A8dCKWBXeDG8XvsEfI5aXfpfJDxwdj',
'1LipkRAvryuddnmN26gsBs7sXjafq2Dmv',
'1jYuqosCSCZC9DqbJvBiMRprveoPv9BhN',
'1PujzfoYJhfy5BZTOQCeGYZ2B2nUmJd6B',
'1FZMP6Hj2BtYjOVbJzaj1lQLvThkpWF_0',
'1ky5SyFttp7BM7Zg5ELEJnwTx0DhXAOBZ',
'1F1fzbT1w515kUd79kj9Q1HTJ_Et-e6Kt',
'1vyrjdW-gjSbHtvY_2siRnEG25tWz-nXj',
'1Qlzp16-7ynWimnBfni7Jh6WqWC01LZ8O',
'1VD5X3rbjuL5IOUEwSfPxdNomk9NpBRaW',
'1Q8QzOLHMEPYE10l2k6CL0gAIklesWHVL',
'1yuuaZ0R2hvr4Pu87-9fwce7LomiqsJCL',
'1bFvPHk71qlZd4ANs-PS4_KZ_yO1ryLg-',
'19HsMobWrlMePXxYdObE6nX9jVJXN6GEa',
'1JBT3VHOuFmJjXm3KucAeEalkPNu59d4i',
'1YC_dh72b08XmawRQxlbKdYUNJU23zbPy',
'1mCit6cF6c7WvkSz7rbq2jFc8bgvh5ArI',
'14nr-5aPKYT2nrSu2zjy2TjgHjGqS7ovs',
'1CkbyRqkTChWsKzwKpOBzfVR_3W-u6nf_',
'1KGMCXLoN_EfaKJ1UqcKHPt4jMhPn56UH',
'1bDnFD_2888MWDlzrp_gge1fEaV1GdbPa',
'1qVW9fH_e25VnGPpYdbjxspmJsGVT6_WP',
'1RpX6XcSQLzhaGpmvaZbBlmg8wZ8G4gcR',
'1dlzQNnKsT1b3M17tDLRSwfHNL3seMfcu',
'1bOGzqNyc44JznBTlS6xxmTUNGLM3YWdQ',
'17z8k-Jnrww6WkNVyWz58pW8XWk835aMc',
'1HJhRpfjnUmRXgG-SeaRla090PxCRaRio',
'1-QFWGjldt1wqD3OnMH1RhQ3o8WjtYHRq',
'1ttfW9e5hF7UlcNTfPfoTVCGENt3PilmC',
'1VWO6og5f2-hizLX4sqpBBPFzvOYGLB4A',
'1jz38Y5PrA8ZZ76w754C5lj3Nj4sTKiN8',
'1KWlUYbLiI27IZbBL3pXWp7WR_AU_5KJ4',
'13LGNutONoYE42bdlnEPimqNhlfq95MlJ',
'1Vl5gbplVT8gXQkKdYsh4M4kdmziJmyTL',
'1YxvXcr9kzqgVK5lyyPKfOK_9kGACV9iY',
'1xZUWeEvUHaKUCtML9SmnOTSGfkl5lPDs',
'1fTKO_iyLG_ysjPERoBNVIVmqzRJv5uPg',
'1jFA95PkjWCnapPlVaDXIDKkJa6NQlTCB',
'1CW9V9mkorYVmpBQKcjujkKNiC4sFFp9R',
'1ESBl_QzFcTWu6WB__hA54jw_IUTWkXFr',
'1fWhhFcsep-4z2GiMv79vRolqrYijZ_wN',
'1YwT-AXqxnJTNCOk2T24A0nrouh3uPtLC',
'1A5UT0exwbbRyj33MO7ssya9TFmJRkUoL',
'1wC2osOIFexUfhzSaCOZ1WDmTZD2J1cvl',
'1Q7rGbqark_tZXqSUgfAEpMwCTdAggb5l',
'1Xb7F2iJJ-P75BJNjD2Zhk80Pl6jqPDD8',
'1g0tJhBLViWF_4HhRUdvDr5Rlndlax0G9',
'1h7r2_dIXgbffWRIrlKd0vyO0l9OXjvhS',
'1cQCMr_0sO-yAjMCc9T8fqaLuXchGRVcZ',
'1PpClWNadnTNT7MfAALEBaOLmcDn52X53',
'1ION7QelmcrJbESjR9nagGvNas_uGzpKX',
'1BNiXLWsWTnfp7AetnBKUaJsCkVEPPizs',
'1tWU0SvUMvt05D31VJr8yLoy72GobvC5_',
'1EGMUgwUyoyKh4Zy1Ga_sbUrH7ebwaV4J',
'1aZD8p1MMyBRwYOAZkTl0jVnD5xz_2KIN',
'1U9dDt3NHrh9Uugj7RloluidQJyrr2QvY',
'1wb0BTRw9c2I1i7v4HODOhMRbSMQzhADE',
'11cs0emqRLgUSb3-Akc_0wDr3nUaUUmU-',
'1z3NHksOq3mR8vyKeQTy0tpZUA-Wwcwqf',
'1EzRNWjw7b-vhns5a6bVVLzyHfTvWQg9m',
'1-DLbCCs4ITKxkaL4mLX8KfMG_3ATEb0h',
'15qOYX5RFKrtSvCQaFlXTzUu0DqkDWjLq',
'1WWCf6VhaPdZ3NvgFRRNMkyqxjZwBdj7S',
'1Zj7Cn4tE2GCV8_4Bo3rN1V5xQmDrkqOe',
'1SveNh2KPyRRI-IEare9q1gDjTsNCOF5J',
'1V5VT2iOG9W3BZVIZIzM48bw77sZWHg4v',
'1omEXMU8PnDqd6JxlzKX5TwIqiOw80IQ7',
'15WZKETdCs1yjP31ioqOB7r-KCqpmjfVI',




];

const generateDynamicEl = (ids: string[]) => {
    return ids.map(id => ({
        src: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
        responsive: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
        thumb: `https://drive.google.com/thumbnail?id=${id}&sz=w100`,
        subHtml: `Image ${id}`,
    }));
};

export const SHaldi: FC = () => {
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

export default SHaldi;
