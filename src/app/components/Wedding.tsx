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
    '1gEVuhMIhfrvUV76OfvqoL2dOnm4Hge4X',
    '10k1aGGHxcK77drky3UmYkwf8coS-hZfe',
    '1FTIm9-v8Fs_lpCW2lNf-XocenzdavkHk',
    '1rPYiLSWohflbnmETl56IGwiirjv2YRB9',
    '1AaOs7Xarpn9pfb_7__ghg7kJCSozM_ET',
    '1uop97hrwIsYItwGxvQun3ey6wLXI4PSu',
    '1AvCi81QKSYfuyv2Lhw0dHMfWwRQVPDil',
    '1VS8qG1Y3JH9t21tY9WljwrH5NgKeBo9_',
'1SDHyVIKhkBsL9WRSb_KvgS4-s7_j9atJ',
'18NjUsN9TYoj9GTIIWTffyRbmqR6Pyqml',
'1ia0NIBXUDeeG0gn2lv4kWk4oVQDK-Cgo',
'1tWh_IHsILwejg8Qf-h9f5S5xlVRWwvEb',
'1-JemeTllUa1nI8x1rwBX_kYt44UULRhP',
'1T43tC0xIuLcTVQGQytsLMQodll007QYF',
'1WtQxtZgvCCbue3J0Aq1lsc3UrTCu4R9D',
'1s4w_VykjqWZnHdSOsdRS8Hc5DSgpuP6J',
'1aYhA9wL5GpmK134NjZoZp3uDVcVgxXWt',
'1ngV6oIqoC11YCEE9SuBIefFwgROV20kv',
'1Ckk2e3q7M5yj0eDm_MOzjkavhuvi3Wwn',
'1o8fOydT4yGdUjkfj0sMk4lx2GqRAH5un',
'1CSfyqebLjxkYWhBkoeS2sOHV35f_4vh-',
'1tscQAOhsoVkPgIKzuqoyCCuZy1PUJ5Q4',
'1WMagycOBGNOIk2-coOCSRcrC-o07lNzG',
'13XSce1TGFKRyGc5EynFtjgzH7ETo98Ii',
'1hmB9dN7r9O3gwjppoaUWMRY2gCHxirgf',
'1_qQPV2mtfkEoAWSMTCOxDgPXPWbfMxn3',
'1EUnfJYHzlGzuZf01Zsr7hN0tDeAaCImo',
'1Et1sGinCmX9rePITOf8gH5QjwFhLVPWc',
'1YsDwHGgT2mCnd8YQLUOrImxpkZa0h-Hm',
'1164C9MWSq8xdbh59CVLVugJe-k9vHpYh',
'1VMQsleLiOb9m_y6hWkyEY3WVlYg3PUov',
'1RRdgP-1IJz5PTzpNh6_51MijCKRrd3b5',
'1tXJzqYvWFxwsuHJGQlbwWqH4tSAiHe2e',
'1fHKymE9wLXEaNHWSuWTa7Jk5r6gFRnnv',
'14c-j3PeSOX6wa7BkXGxU-wGKSc5mF_wg',
'1LvyWlo-iUJddYZPQyldrDCPaAGRHAdcf',
'1pYqftuLU2QV6U7BfZYbePmADOa4BlsZ9',
'12nKkqKVIRReDeMefdOB0sa__Tn0877cW',
'1wyKd8Ko5PW0XULiQPp3xKqJXpQ_IYqv6',
'1vGuXAGAJwoKErBQINcMZQugh7hvpbhrg',
'1MjYCWlXPEOOoHLrUz8-ciWE1qSYEX6hx',
'1R5P5EsiBwAMkG2MIfk1FCN9FNznc6O3j',
'1Ks99JjgSNlNRFR3pubRLCqCXOhvFE9rY',
'1MBom7QGHTuuery_maD1Ag3CbahabUWJ9',
'1LAaN1pDa8Y1_YHRdSqHYP_yfdDivYMvx',
'1OKSAAIu4-6LBqUq8b0HXDxCY_WTGbCMJ',
'14_zNM9agGCRue3dV9Leu9ktuPt-xH3Co',
'1rluJSr8Yl7-wgEFvE_oREB8UOY3m_vct',
'1MMa7b7grVIs5QWvgC_j5yfPAfHbkTZsD',
'1LIOSKm2UMPlgdB74_YDbgwoLAfxfoJGi',
'1w_P3VrkaQfn7V7qupzgZrrq3Z1PMakrr',
'1mUD4LL5iICPGl6UJZ6AKHMLOxKIl44v9',
'168fsssje3viNZecIJOWOxu0Kdf7fvZmC',
'128c_tJ7QXLaV7gw4XENE-ssKb0w7bB51',
'1zZfwIqYPFIsKVahcz7QsYcef_luNvce3',
'15a4HzNvySaChTkxPB-YjyL_XH9yGKrVT',
'1YxFVGS9AflZX4cx900Ok9nTLqnIBXCNA',
'1tFK5IfU23nz9RzZxoOh5UcP_wgnl057a',
'1MAJz2KGx9pa70F1OUlfCxXHexTO9VYqn',
'19M7xsKXg6GR0oFMd5ZLXppxiKBtcTvDd',
'1XqX6mOruXMeZ1Q6jTNxlunB5jdXbzKdg',
'1bEindr1EO2i_s5B_4XhMK7zRPawdslh9',
'1M3Oi9xVHbnvEb2zgRra4B-xZys-LCUM0',
'1H9yQ0TKCHO39u_2QDlucXKfcKH8bbwKK',
'1wpwgcD7gDvbvdo0dNR5CnOmFTh7114GE',
'1IhYo8gdaLds4rDVlwBm3On_5QbKhiYwY',
'1bEK9-e5M1_DeIeE5_yxe7_Sj2nE4Kyh1',
'1aRgLUH_VsGHBMizl7hd72EUxTD-VL4Ib',
'1jmxBPvXMDC2WFor_4f0FzXEQWn3PChmZ',
'1sVzLFI5Q0ptkSdeLFWqMwW6t5IR0rWjx',
'1RSP7eY18ApdnNn_eraeANQdm6LX3GxNY',
'10kc-3L_3ffUxLsgs-GQEcbfHhDNLh6Db',
'12_W99X70dq4VWUE7BRughgZS90MmSBBC',
'1h9rEKqWLGM48TH4Z9Zu6vCnuc14vWV95',
'1IPp_4ls2E-kp3E_Z7YHtmskoIMRbb7li',
'1kLK7_UYSyEJQ9RWH7kFHu6IyfP5QVdP5',
'1gCPT9rC_77vHd_7c9mJzTfmgNDwgE4MT',
'1-uIPc3pI1YBuHT-0AQRRJ_OEe7Qrc6vs',
'1-x98fdGsW5QSVVheSal-HbeycKmIOo2c',
'1KZ6tgyMRMZ6haMJeKkrzvAMiCYz8ac5N',
'1-lG6CI1uNiL0u5f4uL4c9DaiUgeVHii2',
'1sobLqZ7tuhI8NasTn13wE3gFQgRQaGgh',
'1Ona37_87fZ-02mnNgiDgmJ_Sj76kvVtR',
'1ZmkHSAQEaWQwRAcZMXS0ew5wu3reUTJ9',
'14YHTTjeE4hqIMTLdHyEQn6ECT9ctBRlQ',
'1-U3uPmDsjm14jUsuM9ULE5Cqtd3Qfbzg',
'1tHPjEhEZgmUgk3Y0Q7-gbhocNUxusSfn',
'1AYMCrAcL_RTRQmtN1zziatjQ41WZ8v8s',
'1SlkWpgeanwfqe4UPa-fhCoF49rhyDVoO',
'1xcp6MHcBBwCbl9HAD7yv2Hva7emZD9Kl',
'1RxVkYolG4hbhglpqq-EB6-cPhiAfDIjn',
'1JGi9xcY65ue_cz6V4jZxMfT9pTZDI-jQ',
'10IBYgyV1O3WV9zoQAxmQE5V6mIMFOZLr',
'1mQnEbF3SVmzu0rMvYlySaYtGM-KdCKFN',
'1kxzSP6gzevy5DCr7DcU6OrdpfRMxLF31',
'1sC29bJYlJrjl8TVTTOVbnhuoyA07kIZ0',
'14ZY68vyo1Nxs2Xvjr07aK-vUIatFyNWz',
'1kQH3B15gb_6qwB0RfpcpjiGThZDza-vx',
'18eC_v-TGlf8RfX4wBx-9Jko2ZI0UDXju',
'1EZb1H8cdW-IKKBgQaTj_JCW36Rlxx6Ye',
'1OYfDHyKhgN1ZVMZfmTyaOXhWssxzgoBy',
'1U59EMEJh2KEZCzBo2mJpqJqmT-McADvW',
'1Ec_92aNuJD6LUzd0EvdZrb-grdwvjOEf',
'1vta2N4RmTLMpu6Q2Y497GUnTuXm-vj05',
'14t86nT3ttD4ZZbEADy8POMzffE7Ozh01',
'1U9VmiXg68XsQjb_Xjgkh3df-ucv9DtB_',
'1nRrE1cjo-bqWoYKBONnE4B_7thOm_Rvq',
'17t4xHfa9gIjzLc4ub8To86i3TJPpc47m',
'1s-ad_DQDYL8GawC2RwhFzENGBcdluWUa',
'1H-H7qbuYhsmcrj3RITrRXW3pVdQhx5G-',
'1ITOWSgP3E33WBiytYTY3w52wyRfw9Bij',
'1uZ3nQ2RCCCYwDgN7WPgR2EZ5ylXcnvQK',
'1SikDY3cbUhvJ891zHhZHUtekLG6lIcSG',
'1isrNuzp6d-DmrxfXEwWD-Tgtfy4EcXAq',
'1avhYq4QnfNmTzdFj9Lzx4Q4NLpjh8cIE',
'1AykWlpanpJsas5LjESOjOKMRJcDO-ovS',
'1G_O6Ec6t1PdYADZabVSwILMwbkIZbLpZ',
'19gXkXuElgq-f-yyUIqeIBa3zNGXSbwXm',
'1Tdef734VJn91ECh0WSJyd8Uzc1iP5Lst',
'1BEIHZ3hb-rqOtI1uy442G99PFvkIX7Qb',
'1y9gzcOvdM4azIWuszPk-FWK_e2voi3DL',
'1GIkCFWbfoFZAqImfomnP41CkdXc7o-Rw',
'1Zs1Nvdlhqq1ndoUCgMk0pAQWXbNJuHrG',
'1jO49DJ5WPaGpkMGy2v11n8Zgf3MgcN4O',
'1xRivnkNgR_rrNVFGO_ad1-ls83XvS44A',
'1o43Au2uHSfz6Nw1dl-Gwf3u16_HQQe91',
'1WlPDHVq1fbspGixb-YuWfukEGiAdLkmD',
'1jMKSMgAFr-NWMMa1IjPoWTEGN16fsdTP',
'1at7WoYNbfrJM_Rri4uCLPsZO-wr1GCaR',
'1R5UG3c8zfq9_NlkokZLdJlMHNJhhmMEW',
'1O0bj8Z1ZUT7foJf8sbZnWkHd7xvnCHAK',
'1fG3FhsrU7egZ91AT_Wot0UoYPKj0636_',
'10_1zOQ1KLsgtn017zFHVEgsGglRsReL-',
'1YXXKy9wOmBLpELKiRxLagsqCq7Do35nR',
'1GUWG-nYIdN676L8KUFoutvOGh1IcNdZd',
'1XnwKa3cuW6uwaeo2ivfu68wKufV0PNkY',
'16UXgCMzYkz88K2KWxtVAWC3WlDXvWy5G',
'1x0cKzVXla7TM3zrL7Ngwfz4xcdrie39Y',
'1jvmhYGurbcuDa_wm-2LVbpUONts17L_O',
'1FLXEmgQgMaPjNqA44puTM9Jvl8WjJaoK',
'1h_zeag9tXVppRpxbyEpbulje7i6ocl3E',
'1IqbQXOM01_eD7JLAu2NGMgUUG52cF5RH',
'1l5HsD-tKtCcCSXtZjLS_ezk_auKfDCnx',
'1YlaSmbR5Blq8e8LEBa5mTwxgfmgaT1hS',
'1I4yhPruDoe7D9Xrywanbqy9JGAWGVTkl',
'1X5SIQoloNPJAjChEv1C-TDMrQrOlYBGE',
'154lmwvesx1ch4tLYFd1qh_nthnF2TzBR',
'1EvlHj2-3fQ7Hj03CaoR7L80S0jPyP1Jk',
'1UKN3HkIhkUpZybwO525IRS0j3eLbDiNk',
'1GP1G2c5NnuCddsRN0w6_DkVqBzunF-o2',
'1joF6FZdN4djdPniyEXP_vvXrmWLYmyk0',
'1EF0ieXIeLIGPQ7fjT1TD0xU6dOdV5-HQ',
'1Tv-IAxyNd7ybqmzJqHN-Ap0ks4PMBQBm',
'1OTwYyDKmepI98JP0d_0FZlksFVePTozq',
'1VAlZ4lXN0BDamArvJu_sx5KHxpCIAGcn',
'1X2JJ5BRFILqED6nNug8ql84E_wfYLABU',
'1-Dl1LGsi6PN8eG17IxkAsalOjZX4Vu55',
'1h2PVdG8lAvikSg_w-T9kXe46REpipFRr',
'16BWu-B8kpnm87Gs51XJQOZZP9O4eGo88',
'1CNOLRl5jCTXMT1JBcJXK2zfA0c793lqk',
'1wkmtuq0nD-qNhhV1o2HMRz_LD4P4uYnF',
'1XEq8iOur8ndzHi7u3O8PPVVp4ZCHTJfH',
'1dX7IlChOSSNAqOkDWIRfyM2e7J4fWaI0',
'1tDPwimwArbSXBr5zfr6wcaRKOTMFP8M5',
'1LbGW6ICiYgV1A0XCP_LGpUBOvV0G3B9L',
'1Bv-_9_bytERQe7lWyAzUXuUlTV7VSmZO',
'1bDn6vVZjI9YJQrX3lqj53AmwLputpP5J',
'19cavPq-2aKZHGooNF0kpd-4qe19W-aoF',
'1-g6LXREyd7iwTB2NhdZC9bNnvIbfh-7l',
'1Ki5MtnuscI4JHyLe6oPyO48eCp889xjS',
'1wTaZ8szSk9B-P6k8WFcYpc3xBCijQqv1',
'1rawGv0K6klJUi5BSriHl3FfM7psce6UF',
'1_CneljPp3F1VBWA5A-gFyEFGdRHWzXuX',
'1RN9ItatY-vKHvnmuYhHGOXVE2MnrfCow',
'1_ufVPTM5vosq--gVMWoB0v4TDdeLhGIz',
'14sEnzXXz0jh8c5dQuxuiR2jdRyFCll0O',
'1_t1jzwrAzF8VROurVr5tPe1bno8ZITnE',
'1s7M4nMT1EfhYQodwRUypP5yLbyzYPbf8',
'1R41zEBkWETkFpe2eNQgutsp06HwuBf6M',
'139iIt7cOEI6jpKWT6PAcKPU8bhnXtiyw',
'1N9j025vGnL4iJ34AREEz5H9d6paq6pLL',
'110OxyQC8d3KAMIVxvbsL2BfSYahC42uG',
'11oRNbOH3UawgIS15zm1xPXye2f9zfhsw',
'1pGk2_Jcjqotf071azd5Cr4o8iw7RfXlz',
'19rv5Gcy14SuvROBMo1Tdw311FV7MOnKp',
'1N67CcwSILN7BXdNr78z5JM2BLC3y9TKx',
'1jgbCjL_HLvu6-bwManp4JHvxq7gcx08Y',
'1dp4V1BfWfkC_Fw2knxcPlvzd92bkUAVF',
'1N6zKZjz0Yx0X-bfaTDKcW60aWSnpKzTJ',
'14ZuYHhvRNzgZVYFXu0YjBKjIgcogoVh6',
'1T7vgWQLyYyvaxsEh4faE8dml1Y7_yWWz',
'1QdYyiBO4i1AwxVjc32PD7Uu6LVGNmz9m',
'1HfTz4xGu2MGLrcFuYT8y5Bh_7JgvzG7M',
'1e0k9n0JXnGXfR-HrXln4CaZvDbhHkkMx',
'11bEIXKHP0jX7amST4ue2OL6xdidrD8Ml',
'18gtfOhFgyZS3cq3rozhgj_ajwsPJI3Be',
'1RTtP8DMjpRaYASkQRNr4NmXJkHzbYA-5',
'15AP-YswwhqBCJzqw7dhg0a--LSDO_lN9',
'1e6fka0AS5gEWpyrjxJsVWYqdu3bjuluk',

    
];

const generateDynamicEl = (ids: string[]) => {
    return ids.map(id => ({
        src: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
        responsive: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
        thumb: `https://drive.google.com/thumbnail?id=${id}&sz=w100`,
        subHtml: `Image ${id}`,
    }));
};

export const Wedding: FC = () => {
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

export default Wedding;
