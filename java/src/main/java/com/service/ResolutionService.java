package com.service;

import com.entity.Etudiant;
import com.entity.Parametre;
import com.entity.Resolution;
import com.repository.ResolutionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ResolutionService {

    @Autowired
    private ResolutionRepository resolutionRepository;

    @Autowired
    private OperateurService operateurService;

    public Integer create(Resolution m) {
        Resolution saved = resolutionRepository.save(m);
        return saved.getId();
    }

    public boolean delete(Integer id) {
        if (!resolutionRepository.existsById(id)) return false;
        resolutionRepository.deleteById(id);
        return true;
    }

    public boolean update(Resolution m) {
        if (!resolutionRepository.existsById(m.getId())) return false;
        resolutionRepository.save(m);  // save = update
        return true;
    }

    public List<Resolution> getAll() {
        return resolutionRepository.findAll();
    }

    public Optional<Resolution> getById(Integer id) {
        return resolutionRepository.findById(id);
    }

    // my fonctions
    // get resolution
    public String get_resolution(List<Parametre> parametre, double diff) {
        String reso = null;
        
        for (Parametre p : parametre) {
            boolean compare = operateurService.comparer(p.getOperateur().getOperateur(), diff, p.getDiff());
            if (compare) {
                reso = p.getResolution().getResolution();
                break;
            }
        }

        return reso;
    }

    // get parametre inf ecart
    public List<Parametre> get_parametre_inf_ecart(double ecart, double diff, List<Parametre> parametres) {
        List <Parametre> param = new ArrayList<>();

        for (Parametre p : parametres) {
            double d = Math.abs(p.getDiff() - diff);
            if (d <= ecart) {
                param.add(p);
            }
        }

        return param;
    }

    // get parametre with ecart
    public List<Parametre> get_parametre_with_ecart(double ecart, double diff, List<Parametre> parametres) {
        List <Parametre> param = new ArrayList<>();

        for (Parametre p : parametres) {
            double d = Math.abs(p.getDiff() - diff);
            if (d == ecart) {
                param.add(p);
            }
        }

        return param;
    }

    // get parametre with diff
    public List<Parametre> get_parametre_with_diff(double diff, List<Parametre> parametres) {
        List <Parametre> param = new ArrayList<>();

        for (Parametre p : parametres) {
            if (p.getDiff() == diff) {
                param.add(p);
            }
        }

        return param;
    }

    // resolution liste param ecart
    public Parametre resolution_param_ecart(List<Parametre> parametres) {
        return parametres.get(0);
    }

    // resolution v2 parametre ray
    public String reso_v2_param1(List<Parametre> parametre) {
        return parametre.get(0).getResolution().getResolution();
    }

    // resolution v2 ecart 0
    public String reso_v2_ecart0(List<Parametre> parametre, double diff) {
        String reso = null;

        // mijery sode misy ecart = 0
        double ecart = 0;

        List<Parametre> parametre_with_ecart = get_parametre_with_ecart(ecart, diff, parametre);

        if (parametre_with_ecart.size() > 1) {
            reso = resolution_param_ecart(parametre_with_ecart).getResolution().getResolution();
            return reso;
        } else if (parametre_with_ecart.size() == 1) {
            reso = parametre_with_ecart.get(0).getResolution().getResolution();
            return reso;
        }

        return reso;
    }

    // resolution v2 parametre bedabe
    public String reso_v2_param_maro(List<Parametre> parametre, double diff) throws Exception {
        String reso = null;
        double min = Double.MAX_VALUE;

        for (Parametre p : parametre) {
            double ecart = Math.abs(p.getDiff() - diff);
            if (ecart == min) {
                List<Parametre> parametre_inf_ecart = get_parametre_inf_ecart(ecart, diff, parametre);
                // mijery anle param le plus petit
                parametre_inf_ecart.sort(Comparator.comparing(Parametre::getDiff));

                List<Parametre> parametre_with_ecart = get_parametre_with_diff(parametre_inf_ecart.get(0).getDiff(), parametre_inf_ecart);

                // param plus petit bedabe
                if (parametre_with_ecart.size() > 1) {
                    reso = resolution_param_ecart(parametre_with_ecart).getResolution().getResolution();
                    return reso;
                } else if (parametre_with_ecart.size() == 1) {
                    reso = parametre_with_ecart.get(0).getResolution().getResolution();
                    return reso;
                } else {
                    throw new Exception("Resolution non trouve");
                }
            }

            if (ecart < min) {
                min = ecart;
                reso = p.getResolution().getResolution();
            }
        }

        return reso;
    }
 
    // get resolution v2
    public String get_resolution_v2(List<Parametre> parametre, double diff) throws Exception {
        String reso = null;

        // Parametre ray
        if (parametre.size() == 1) {
            return reso_v2_param1(parametre);
        }

        // mijery sode misy ecart = 0
        reso = reso_v2_ecart0(parametre, diff);
        
        // Parametre bedabe
        reso = reso_v2_param_maro(parametre, diff);

        return reso;
    }

    // find resolution
    public double find_resolution(List<Double> notes, String reso) {
        if (reso.equalsIgnoreCase("plus petit")) {
            return resolution_plus_petit(notes);
        } else if (reso.equalsIgnoreCase("plus grand")) {
            return resolution_plus_grand(notes);
        } else if (reso.equalsIgnoreCase("moyenne")) {
            return resolution_moyenne(notes);
        }

        return 0.0;
    }

    // somme 
    public double somme(List<Double> diff) {
        double somme = 0;

        for (Double d : diff) {
            somme += d;
        }

        return somme;
    }

    // resolution plus grand
    public double resolution_plus_petit(List<Double> notes) {
        Collections.sort(notes);

        return notes.get(0);
    }

    // resolution plus petit
    public double resolution_plus_grand(List<Double> notes) {
        Collections.sort(notes, Collections.reverseOrder());

        return notes.get(0);
    }

    // resolution moyenne
    public double resolution_moyenne(List<Double> notes) {
        return somme(notes) / notes.size();
    }
}
